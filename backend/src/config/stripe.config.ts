import Stripe from "stripe";
import { StripeKeys } from "./keys.config";

const stripe = new Stripe(StripeKeys, { apiVersion: "2023-08-16" });

export default stripe;
