const db = require("../../../config/database");
const productServices = {
  get: async (all) => {
    const data = await db("product").select("productID","productName", "productQty","productPrice");
    return data;
  },
  cekAll: (req) => {
    const data = db("product").select("*").first();
    return data;
  },
  cek: (productID) => {
    const data = db("product").select("*").where({ productID }).first();
    return data;
  },
  getProductById: (productID) => {
    const data = db("product").select("*").where("productID", productID).first();
    return data;
  },
  inputProduct: (productName,productQty,productPrice) => {
    const data = db("product").insert({
      productName: productName,
      productQty : productQty,
      productPrice : productPrice,
    });

    return data;
  },
  updateData: async (productID,productName, productQty, productPrice) => {
    const hasil = await db("product")
      .update({
        productName : productName,
        productQty: productQty,
        productPrice : productPrice,
      })
      .where({
        productID,
      });
    return hasil;
  },
  deleteData: async (productID) => {
    const hasil = await db("product").delete().where("productID", productID);
    return hasil;
  },
};

module.exports = productServices;
