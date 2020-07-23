const express = require("express");
const router = express.Router();
const User = require("../models/users.model");
const cat_controller = require("../controller/category.controller");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.render("welcome");
};

const catRoutes = (passport) => {
  router.get("/", isAuthenticated, async (req, res) => {
    cat_controller.cat_getAll(req, res);
  });

  router.post("/createCat", (req, res, next) => {
    cat_controller.cat_create(req, res, next);
  });

  router.get("/updateCat/:id", isAuthenticated, async (req, res) => {
    cat_controller.cat_getCat(req, res);
  });

  router.post("/updateCat", (req, res, next) => {
    cat_controller.cat_update(req, res, next);
  });

  router.get('/deleteCat/:oldCat', isAuthenticated, async (req, res) => {
    cat_controller.cat_delete(req, res);
  })

  return router;
};

module.exports = catRoutes;
