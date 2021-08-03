const db = require("../../../config/database");
const ordersService = {
  get: async (all) => {
    const data = await db("orders").select("orderID","productID","productQty","name", "phoneNumber","email","address","paymentProof","orderStatus","shippingID");
    return data;
  },
  cekAll: (req) => {
    const data = db("orders").select("*").first();
    return data;
  },
  cek: (orderID) => {
    const data = db("orders").select("*").where({ orderID }).first();
    return data;
  },
  cekQty: (productID,productQty) => {
    const data = db("product").select("*").where({ productID: productID,productQty: 0}).first();
    return data;
  },
  cekQtyAfterDecrement: (productID,productQty) => {
    const data = db("product").select("productQty", "productQty")
    .where("productQty","<",0) .first();
    return data;
  },
  updateQty: async (productID,productQty) => {
    const data = await db("product")
    .decrement({
        productQty: productQty
    })
    .where({
        productID 
    })
    return data;
  },
  updateQty2: async (productID,productQty) => {
    const data = await db("product")
    .increment({
        productQty: productQty
    })
    .where({
        productID 
    })
    return data;
  },
  getOrdersById: (orderID) => {
    const data = db("orders").select("*").where("orderID", orderID).first();
    return data;
  },
  inputOrders: (productID,productQty,name,phoneNumber,email,address) => {
    const data = db("orders").insert({
      productID: productID,
      productQty: productQty,
      name: name,
      phoneNumber : phoneNumber,
      email : email,
      address : address
    });

    return data;
  },
  updateData: async (orderID,productID,productQty,name, phoneNumber, email,address,paymentProof,orderStatus,shippingID) => {
    const hasil = await db("orders")
      .update({
        productID: productID,
        productQty: productQty,
        name : name,
        phoneNumber: phoneNumber,
        email : email,
        address : address,
        paymentProof : paymentProof,
        orderStatus : orderStatus,
        shippingID : shippingID,  
      })
      .where({
        orderID,
      });
    return hasil;
  },
  updateDataPayment: async (orderID,paymentProof) => {
    const hasil = await db("orders")
      .update({
        paymentProof : paymentProof
      })
      .where({
        orderID,
      });
    return hasil;
  },
  updateDataStatus: async (orderID,orderStatus) => {
    const hasil = await db("orders")
      .update({
        orderStatus : orderStatus
      })
      .where({
        orderID,
      });
    return hasil;
  },
};

module.exports = ordersService;
