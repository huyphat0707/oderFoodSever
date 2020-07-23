const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ProductSchema = new Schema({
    TenSp :{
        type: String, required: true
    },
    LoaiSp: {
        type: String, required: true
    },
    Images:{
        type: String, contentType: String
    },
    GiaSp:{
        type: String, required: true
    },
    NgayThemSp:{
        type: String, required: true
    },
    MoTaSp:{
        type: String, required: true
    }
});

module.exports = mongoose.model('product', ProductSchema);