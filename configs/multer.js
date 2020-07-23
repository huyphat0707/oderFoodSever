const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,res, cb)=>{
        cb(null,"../final/public/upload")
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname);
    }
});
const fileFilter = (req,file,cb) =>{
    let ext = path.extname(file.originalname);
    if(
        ext !== ".png"&&
        ext !== ".jpg"&&
        ext !== ".jpeg"&&
        ext !== ".bmp"&&
        ext !== ".gif"&&
        ext !== ".jfif"
        )
        return cb(new Error("Chỉ tải lên tệp ảnh!!"));
        cb(null,true);
}

const uploadImage = multer({
    storage: storage,
    fileFilter:fileFilter,
    limits: {fieldSize:3*1024*1024}
})

module.exports = uploadImage;