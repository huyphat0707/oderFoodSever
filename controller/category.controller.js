const category = require("../models/category.model");
const product = require("../controller/product.controller");
//====/////////
exports.cat_getCatToCreateProduct = (req, res) => {
  category
    .find({})
    .lean()
    .exec((err, data) => {
      if (err) {
        console.log("Error cat_getCat");
      }
      res.render("newProducts", {
        user: req.user.name,
        catList: data.reverse(),
      });
    });
};

exports.cat_getAll = (req, res) => {
  category
    .find({})
    .lean()
    .exec((err, data) => {
      if (err) {
        console.log("Error at cat_getAll: " + err);
      }
      res.render("category", {
        catData: data.reverse(),
        user: req.user.name,
      });
    });
};

exports.cat_create = function (req, res) {
  let catNameForm = req.body.catName;

  category
  .findOne({catName:catNameForm})
  .lean()
  .exec((err,data)=>{
    if(data==null){
      let cat = new category({
        catName: req.body.catName,
        Description: req.body.catDes,
      });

        

  cat.save((err) => {
    if (err) {
      res.render("category", { message: " Failed!" });
      console.log("Error at cat_create method in category controller");
    }
    category
      .find({})
      .lean()
      .exec((err, data) => {
        if (err) {
          console.log("Error at cat_getAll: " + err);
        }
        res.render("category", {
          title:"Dashboard",
          layout:"main",
          catData: data.reverse(),
          message: " Successfully!",
        });
      });
  });
    }else{
      category
      .find({})
      .lean()
      .exec((err, data) => {
        if (err) {
          console.log("Error at cat_getAll: " + err);
        }
        res.render("category", {
          layout:"main",
          catData: data.reverse(),
          user:req.user.name,
          message: "Loai Sản Phẩm Đã Tồn Tại!",
        });
      });
    }

  })

};

exports.cat_getCat = (req, res) => {
  category
    .findById(req.params.id)
    .lean()
    .exec((err, doc) => {
      if (!err) {
        res.render("catEdit", {
          Cat: doc,
          user: req.user.name,
        });
      }
    });
};

exports.cat_update = function (req, res) {
  category.updateOne(
    { _id: req.body._id },
    { $set: { catName: req.body.catName, Description: req.body.catDes } },
    (err, data) => {
      if (!err) {
        product.upDateManyProductByCatName(req, res);

        category
          .find({})
          .lean()
          .exec((err, data) => {
            if (err) {
              console.log("Error at cat_getAll: " + err);
            }
            res.render("category", {
              catData: data.reverse(),
              user: req.user.name,
              updateMessage: "updated success",
            });
          });
      } else {
        console.log("Edit Failed");
      }
    }
  );
};

exports.cat_delete = (req, res) => {
 product.pro_deleteAllByProName(req, res);

  category.deleteOne({ catName: req.params.oldCat }, (err, doc) => {
    if (!err) {
      category
        .find({})
        .lean()
        .exec((err, data) => {
          if (err) {
            console.log("Error at cat_delete: " + err);
          }
          res.render("category", {
            catData: data.reverse(),
            user: req.user.name,
            updateMessage: "Category has been deleted!",
          });
        });
    } else {
      console.log(err);
    }
  });
};
