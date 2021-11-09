const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET request top /orders",
  });
});

router.post("/", (req, res, next) => {
  const order = {
    product_id: req.body.product_id,
    qty: req.body.qty,
  };
  res.status(201).json({
    message: "POST request top /orders",
    order,
  });
});

router.get("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Order details",
    order_id: req.params.id,
  });
});

router.delete("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Order deleted",
    order_id: req.params.id,
  });
});

module.exports = router;
