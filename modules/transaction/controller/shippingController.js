const shippingServices = require("../services/shipppingService");
const responseFormatter = require("../../../responses/responses");

const shippingController = {
  get: async (req, res, next) => {
    try {
      const data = await shippingServices.get(req);
      const cek = await shippingServices.cekAll(req);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  getByID: async (req, res, next) => {
    try {
      const {shippingID} = req.body;
      const data = await shippingServices.getShippingById(shippingID);
      const cek = await shippingServices.cekAll(req);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      return responseFormatter.success(res, data, "data ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
  create: async (req, res, next) => {
    // console.log("cobaa");
    try {
      const {orderID,shippingStatus} = req.body;
    //   console.log(req.body);
      const cekOrder = await shippingServices.cekOrder(orderID)
      if(!cekOrder){
        return responseFormatter.error(res, null, "Order ID tidak ditemukan", 404);
      }
      const input = await shippingServices.inputShipping(orderID,shippingStatus);
      const newInput = await shippingServices.getShippingById(input[0]);
      const data = { shippingID: 
        newInput.shippingID,
        orderID : newInput.orderID,
        shippingStatus : newInput.shippingStatus,
        orderStatus : newInput.shippingStatus
    };
    const shippingData = data;
    const shipping = shippingData.shippingID
    // console.log(shipping);
    const addShippingToOrders = await shippingServices.updateOrdersShipping(orderID, shipping)
    if(addShippingToOrders){
        console.log(data);
      return responseFormatter.success(
        res,
        data,
        "berhasil menambahkan Shipping",
        200
      );
    }
    } catch (error) {
      return responseFormatter.error(
        res,
        null,
        error.message,
        500
      );
    }
  },
  update: async (req, res, next) => {
    try {
      const { shippingID } = req.body;
      const { orderID,shippingStatus} = req.body;
      const cek = await shippingServices.cek(shippingID);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "data tidak ditemukan",
          404
        );
      }
      const result = await shippingServices.updateData(shippingID,orderID, shippingStatus);
      const newUpdate = await shippingServices.getShippingById(shippingID);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { shippingID,orderID, shippingStatus }),
          "Berhasil mengubah Shipping",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};
module.exports = shippingController;
