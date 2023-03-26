const express = require("express");
const {
  createOrders,
  getOneOrder,
  getLoggedInOrders,
  admingetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

//user route
router.route("/order/create").post(isLoggedIn, createOrders);
router.route("/order/:id").post(isLoggedIn, getOneOrder);
router.route("/myorder").get(isLoggedIn, getLoggedInOrders);

//admin route
router
  .route("/admin/orders")
  .get(isLoggedIn, customRole("admin"), admingetAllOrders);
router
  .route("/admin/order/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOrder)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOrder);

module.exports = router;
