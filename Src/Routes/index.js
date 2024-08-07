module.exports = (app) => {
  const {
    addProducts,
    getProductsStartswithH,
    deleteDuplicateProduct,
    getRating,
  } = require("../Controller/products");

  app.post("/api/products/add", addProducts);
  app.get("/api/products/name-with-h", getProductsStartswithH);
  app.get("/api/products/avarage-rate", getRating);
  app.delete("/api/products/delete-duplicates", deleteDuplicateProduct);
};
