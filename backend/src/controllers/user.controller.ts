import { Request, Response } from "express";
import User from "../models/user.model";
import stripe from "../config/stripe.config";
import { tokenHelper } from "../helper/token.helper";
import bcrypt from "bcrypt";

export const createCustomer = async (req: Request, res: Response) => {
  const { email, password, name }: any = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are mandatory" }); // Return to exit the function
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    return res.status(400).json({ error: "User already registered" }); // Return to exit the function
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const stripeCustomer = await stripe.customers.create({
      email: email,
      name: name,
    });

    const user = await User.create({
      email: email,
      password: hashedPassword,
      name: name,
      subscriptionId: "",
      customerId: stripeCustomer.id,
      isSubscribed: false,
      searchCount: 0,
    });

    if (user) {
      user.save();
      return res.status(201).json({ _email: user.email, _name: user.name }); // Return to exit the function
    } else {
      return res.status(400).json({ error: "User data is not valid" }); // Return to exit the function
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: error }); // Return to exit the function
  }
};

export const getAllCustomer = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const stripeCustomers = await stripe.customers.list({
      limit: 10,
    });

    const _data = stripeCustomers.data;
    const _customerLists = _data.map((customer) => {
      const _index = users.findIndex((x) => x.customerId === customer.id);
      const _obj: any = {
        name: customer.name,
        email: customer.email,
        customerId: customer.id,
        password: users[_index]?.password ? users[_index]?.password : "default",
        subscriptionId: "",
        isSubscribed: users[_index]?.isSubscribed
          ? users[_index]?.isSubscribed
          : false,
        searchCount: users[_index].searchCount,
      };
      return _obj;
    });

    res.status(200).json(_customerLists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't get all Customers" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are mandatory" }); // Return to exit the function
  }

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = tokenHelper(user);
      const _obj = { ...user, accessToken }; // Set the header before sending the response
      return res.status(201).json(_obj); // Return to exit the function
    } else {
      return res.status(400).json({ error: "Unauthorized user" }); // Return to exit the function
    }
  } catch (error) {
    console.error(error);
    console.log(error); // Log the error for debugging
    return res.status(500).json({ error: error }); // Return to exit the function
  }
};

export const currentUser = async (req: Request, res: Response) => {
  try {
    const _data = req.body;
    const user = await User.findOne({ email: _data.email });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, searchCount } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    const _updatedUser = { ...user, searchCount };
    console.log(_updatedUser);

    await User.updateOne(
      { email: email },
      {
        $set: {
          searchCount: searchCount,
        },
      }
    );
    res.status(200).json(_updatedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
