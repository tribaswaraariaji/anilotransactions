const productServices = require("../services/productService");
const responseFormatter = require("../../../responses/responses");

const productController = {
  get: async (req, res, next) => {
    try {
      const data = await productServices.get(req);
      const cek = await productServices.cekAll(req);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "Product tidak ditemukan",
          404
        );
      }
      return responseFormatter.success(res, data, "Product ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  update: async (req, res, next) => {
    try {
      const { productID } = req.body;
      const { productName,productQty,productPrice} = req.body;
      const cek = await productServices.cek(productID);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "Product tidak ditemukan",
          404
        );
      }
      const result = await productServices.updateData(productID,productName, productQty, productPrice);
      const newUpdate = await productServices.getMastertipeasetById(productID);

      if (result) {
        return responseFormatter.success(
          res,
          (data = { productID,productName, productQty, productPrice }),
          "berhasil mengubah Product",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};
module.exports = productController;
