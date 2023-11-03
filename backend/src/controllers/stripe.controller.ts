import { Request, Response } from "express";
import Subscriptions from "../models/subscription.model";
import stripe from "../config/stripe.config";
import SubscriptionHistory from "../models/subsciptionHistory.model";
import User from "../models/user.model";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const StripePrice = await stripe.prices.list();
    const _subscriptions: any = StripePrice.data.map((x) => {
      const price = Number(x?.unit_amount) / 100;
      const UsageLimit =
        x?.nickname === "Basic"
          ? 10
          : x?.nickname === "Starter"
          ? 20
          : x?.nickname === "Advance"
          ? Infinity
          : 0;

      return {
        subscriptionName: x?.nickname,
        subscriptionId: x?.id,
        price: price,
        usageLimit: UsageLimit,
      };
    });

    res.status(200).json(_subscriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't get all products" });
  }
};

export const subscribePlan = async (req: Request, res: Response) => {
  try {
    const _subscriptionPlan = req.body.subscriptionPlan;
    const _user = req.body.user;

    const session = await stripe.checkout.sessions.create({
      success_url: "http://192.168.1.60:5173/",
      customer: _user.customerId,
      line_items: [{ price: _subscriptionPlan.subscriptionId, quantity: 1 }],
      mode: "payment",
    });

    const user = await User.updateOne(
      { customerId: _user.customerId },
      { $set: { paymentType: _user.paymentType } }
    );

    res.status(201).json(session);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error });
  }
};

export const webHookReq = async (req: Request, res: Response) => {
  try {
    const _data = req.body.data.object;

    const _stripePrice = (await _data?.amount_total) / 100;

    const _subscription: any = await Subscriptions.findOne({
      price: _stripePrice,
    });

    const SubscriptionDetails = {
      customerId: _data?.customer,
      email: _data?.customer_details?.email,
      payment_status: _data?.payment_status,
      price: _stripePrice,
    };

    if (SubscriptionDetails.payment_status === "paid") {
      const _user = await User.findOne({ email: SubscriptionDetails.email });

      if (_user) {
        const _upgradeCount =
          _subscription.subscriptionId === "price_1NiaLISHcMkl8RlvaPwztcZK"
            ? null
            : _user.searchCount + _subscription.usageLimit;
        const _searchCount =
          _user?.paymentType === "SUBSCRIBE"
            ? _subscription.usageLimit
            : _user?.paymentType === "UPGRADE"
            ? _upgradeCount
            : _user?.paymentType === "DOWNGRADE"
            ? _subscription.usageLimit
            : 0;

        User;
        try {
          const user = await User.updateOne(
            { email: SubscriptionDetails.email },
            {
              $set: {
                isSubscribed: true,
                subscriptionId: _subscription.subscriptionId,
                searchCount: _searchCount,
              },
            }
          );
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: error });
        }
      }
    }
    const subscriptionHistory = new SubscriptionHistory(SubscriptionDetails);
    subscriptionHistory.save();
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getSubscriptionHistory = async (req: Request, res: Response) => {
  try {
    const SubHistory = await SubscriptionHistory.find();
    res.status(200).json(SubHistory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get subscription History" });
  }
};
