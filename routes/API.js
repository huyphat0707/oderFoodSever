const express = require("express");
const router = express.Router();

const API = require('../controller/product.controller');

router.get('/api/product', API.getAll);

module.exports = router;