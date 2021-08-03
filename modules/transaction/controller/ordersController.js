const ordersService = require("../services/ordersService");
const responseFormatter = require("../../../responses/responses");

const ordersController = {
  get: async (req, res, next) => {
    try {
      const data = await ordersService.get(req);
      const cek = await ordersService.cekAll(req);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "Order tidak ditemukan",
          404
        );
      }
      return responseFormatter.success(res, data, "Order ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  create: async (req, res, next) => {
    // console.log("cobaa");
    try {
      const { productID,productQty,name,phoneNumber,email,address } = req.body;
      const cekInput = await ordersService.cekQty(req.body.productID, req.body.productQty);
      if(cekInput){
          return responseFormatter.badRequest(res, null, "Stok tidak tersedia!", 400)
      }
      else{
        const updateProduct = await ordersService.updateQty(req.body.productID, req.body.productQty)
        if(updateProduct){
            const cekStok = await ordersService.cekQtyAfterDecrement(productID,productQty);
            if(cekStok){
            const returnStok = await ordersService.updateQty2(productID,productQty)
            if(returnStok){
            return responseFormatter.badRequest(res, null, "Stok tidak cukup!", 400)
            }
            }
      }}
      const input = await ordersService.inputOrders(productID,productQty,name,phoneNumber,email,address);
      const newInput = await ordersService.getOrdersById(input[0]);
      const data = { 
        orderID: newInput.orderID,
        productID: newInput.productID,
        productQty: newInput.productQty,
        name : newInput.name,
        phoneNumber : newInput.phoneNumber,
        email : newInput.email,
        address : newInput.address
    };
    
      return responseFormatter.success(
        res,
        data,
        "berhasil menambahkan Order",
        200
      );
    } catch (error) {
      return responseFormatter.error(
        res,
        null,
        error.message,
        500
      );
    }
  },
  updatePayment: async (req, res, next) => {
    try {
      const { orderID } = req.body;
      const { paymentProof} = req.body;
      const cek = await ordersService.cek(orderID);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "Order tidak ditemukan",
          404
        );
      }
      const result = await ordersService.updateDataPayment(orderID,paymentProof);
      const newUpdate = await ordersService.getOrdersById(orderID);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { orderID,paymentProof }),
          "berhasil menambahkan Payment Proof",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  updateStatus: async (req, res, next) => {
    try {
      const { orderID } = req.body;
      const { orderStatus} = req.body;
      const cek = await ordersService.cek(orderID);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "Order tidak ditemukan",
          404
        );
      }
      const result = await ordersService.updateDataStatus(orderID,orderStatus);
      const newUpdate = await ordersService.getOrdersById(orderID);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { orderID,orderStatus }),
          "berhasil menambahkan Order Status",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};
module.exports = ordersController;
