const express = require("express");
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

const router = express.Router();

router.get("/", (req, res, next) => {
  Order.find()
    .select("product _id quantity")
    .exec()
    .then((docs) =>
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3050/orders/" + doc._id,
            },
          };
        }),
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      !product && res.status(404).json({ message: "Product not found" });
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Order stored!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Order.findById(req.params.id)
    .exec()
    .then((order) => {
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3050/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Order.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json({
        message: "DELETED!",
      });
    })
    .catch((err) => res.status(500).json({ message: err }));
});

module.exports = router;
