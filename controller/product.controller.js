const productModel = require("../models/product.model");

exports.getAll = async (req, res) => {
  try {
    let product = await productModel.find({});
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

exports.getProducts = async (req,res) =>{
  try {
    let product = await productModel.findById(req.params.id);
    res.send(product);
  } catch (error) {
    console.log(err)
  }
};


//getAll
exports.pro_getAll = (req, res) => {
  productModel
    .find({})
    .lean()
    .exec((err, data) => {
      if (err) {
        console.log("Error pro_getAll:" + err);
      }
      res.render("home", {
        productData: data.reverse(),
        user: req.user.name,
      });
    });
};
//get 1 sp
exports.pro_getProducts = (req, res) => {

  productModel
    .findById(req.params.id)
    .lean()
    .exec((err, doc) => {
      if (!err) {
        res.render("newProductsEdit", {
          Products: doc,
          
        });
      }
    });
};
//tao moi
exports.pro_create = (req, res) => {
  let product = new productModel({
    LoaiSp: req.body.loaiSp,
    TenSp: req.body.tenSp,
    GiaSp: req.body.giaSp,
    NgayThemSp: req.body.ngayThemSp,
    MoTaSp: req.body.moTaSp,
    Images: req.file.originalname,
  });

  product.save((err) => {
    if (err) {
      res.render("home", { message: "Create Product Failed!" });
      console.log("error!");
    }

    productModel
      .find({})
      .lean()
      .exec((err, data) => {
        if (err) {
          console.log("error:" + err);
        }
        res.redirect("home");
      });
  });
};
//cap nhat
exports.pro_update = function (req, res) {
  try {
    productModel.updateOne(
      { _id: req.body._id },
      {
        $set: {
          TenSp: req.body.tenSp,
          LoaiSp: req.body.loaiSp,
          GiaSp: req.body.giaSp,
          NgayThemSp: req.body.ngayThemSp,
          MoTaSp: req.body.moTaSp,
          Images: req.file.originalname,
        },
      },
      (err, data) => {
        if (err) {
          console.log("Update Failed");
        } else {
          res.redirect("/home");
        }
      }
    );
  } catch (error) {
    productModel.updateOne(
      { _id: req.body._id },
      {
        $set: {
          TenSp: req.body.tenSp,
          LoaiSp: req.body.loaiSp,
          GiaSp: req.body.giaSp,
          NgayThemSp: req.body.ngayThemSp,
          MoTaSp: req.body.moTaSp,
        },
      },
      (err, data) => {
        if (err) {
          console.log("Update Failed");
        } else {
          res.redirect("/home");
        }
      }
    );
  }
};

exports.upDateManyProductByCatName = (req, res) => {
  productModel.updateMany({
    LoaiSp:req.body.oldCat
  },
  {$set:{LoaiSp:req.body.catName}},
  (err2, data2) => {
    if(err2){
      console.log("Error at cat_getAll: " + err2);
    }
  }
  );
};
//delete
exports.pro_delete = (req, res) => {
  productModel.deleteOne(
    {
      _id: req.params.id,
    },
    (err, doc) => {
      if (!err) {
        productModel
          .find({})
          .lean()
          .exec((err, data) => {
            if (err) {
              console.log("Error at product_Delete: " + err);
            }
            res.render("home", {
              productData: data.reverse(),
              // user: req.user.name,
              deleteMessage: " deleted success",
            });
          });
      } else {
        console.log(err);
      }
    }
  );
};


exports.pro_deleteAllByProName = (req,res) =>{
    productModel.deleteMany({LoaiSp: req.params.oldCat}, (err) => {
        if(err){
          console.log("Error at news_deleteAllByCatName: " + err);
        }
      })
}