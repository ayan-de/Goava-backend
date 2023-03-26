const express = require("express");
const {
  sendStripeKey,
  captureStripePayment,
  sendRazorpayKey,
  captureRazorpayPayment,
} = require("../controllers/paymentController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/stripekey").get(sendStripeKey);
router.route("/razorpaykey").get(sendStripeKey);

router.route("/capturestripekey").post(isLoggedIn, captureStripePayment);
router.route("/capturerazorpaykey").post(isLoggedIn, captureRazorpayPayment);

module.exports = router;
