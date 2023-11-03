import { Router } from "express";
import * as StripeController from "../controllers/stripe.controller";

const router = Router();

router.get("/getAllProducts", StripeController.getAllProducts);
router.post("/subscribe-plan", StripeController.subscribePlan);
router.post("/webhook-req", StripeController.webHookReq);
router.get("/subscription-history", StripeController.getSubscriptionHistory);

export default router;
