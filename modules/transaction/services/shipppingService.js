const db = require("../../../config/database");
const shippingServices = {
  get: async (all) => {
    const data = await db("shipping").select("shippingID","orderID", "shippingStatus");
    return data;
  },
  cekAll: (req) => {
    const data = db("shipping").select("*").first();
    return data;
  },
  cek: (shippingID) => {
    const data = db("shipping").select("*").where({ shippingID }).first();
    return data;
  },
  cekOrder: (orderID) => {
    const data = db("orders").select("*").where("orderID", orderID).first();
    return data;
  },
  getShippingById: (shippingID) => {
    const data = db("shipping").select("*").where("shippingID", shippingID).first();
    return data;
  },
  inputShipping: (orderID,shippingStatus) => {
    const data = db("shipping").insert({
      orderID: orderID,
      shippingStatus : shippingStatus
    });

    return data;
  },
  updateData: async (shippingID,orderID, shippingStatus) => {
    const hasil = await db("shipping")
      .update({
        orderID : orderID,
        shippingStatus: shippingStatus
      })
      .where({
        shippingID,
      });
    return hasil;
  },
  updateOrdersShipping: async (orderID,shippingID) => {
    const hasil = await db("orders")
      .update({
        shippingID:shippingID
      })
      .where({
        orderID
      });
    return hasil;
  },
};

module.exports = shippingServices;
