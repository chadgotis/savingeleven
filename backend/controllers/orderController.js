import Order from "../models/orderModel.js";

const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ msg: "No Ordered Items" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingAddress,
        totalPrice,
        shippingPrice,
      });

      const createdOrder = await order.save();

      res.json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ msg: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ msg: "Order not Found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ msg: "Order not Found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const listMyOrders = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user.id });

    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const listOrders = async (req, res) => {
  try {
    const order = await Order.find().populate("user", "id name");

    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  listMyOrders,
  listOrders,
  updateOrderToDelivered,
};
