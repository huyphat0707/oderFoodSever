const express = require("express");
const router = express.Router();
const uploadImage = require("../configs/multer");
const category = require("../controller/category.controller");
const product_controller = require("../controller/product.controller");

const isAuthenticated = (req,res, next) =>{
    if(isAuthenticated) return next();
    res.render("welcome");
};

const productRoutes = (passport) =>{
    router.get("/home", isAuthenticated, async(req,res) =>{
        product_controller.pro_getAll(req,res);
    });

    //lấy loại ra để chọn khi tạo mới sản phẩm
    router.get("/newProducts", isAuthenticated, async (req, res) => {
        category.cat_getCatToCreateProduct(req, res);
      });

      //tạo mới
      router.post("/createProduct", uploadImage.single('image'), (req, res) => {
        product_controller.pro_create(req, res);
      });
    
      router.get("/updateProduct/:id", isAuthenticated, async (req, res) => {
        product_controller.pro_getProducts(req, res);
      });
    
      router.post("/updateProductAndShow", uploadImage.single('image'), (req, res) => {
        product_controller.pro_update(req, res);
      });
    
      router.get('/deleteProduct/:id', isAuthenticated, async (req, res) => {
        product_controller.pro_delete(req, res);
      })
    
      return router;
    };
    
    module.exports = productRoutes;
