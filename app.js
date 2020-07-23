const express = require("express");
const expressHbs = require("express-handlebars");
const app = express();
const passport = require("passport");
const expressSession = require("express-session");

const userRoutes = require("./routes/users.route");
const catRoutes = require("./routes/category.route");
const proRoutes = require("./routes/product.route");

var initPassport = require("./passports/initSetup");
const flash = require("connect-flash");
app.use(flash());

app.engine(
  "hbs",
  expressHbs({
    extname: "hbs",
    defaultView: "main",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("view engine", ".hbs");

app.use(express.static(__dirname + "/public"));
app.use("/upload", express.static("/public/upload"));

app.use(
  expressSession({
    secret: "The login section is referenced from LeeHao",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

const connectDB = require("./configs/dbmongoo");
connectDB();

//Cấu hình form gửi từ client
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", userRoutes(passport));
app.use("/category", catRoutes(passport));
app.use("/product", proRoutes(passport));

app.use(require("./routes/API"));

app.listen(process.env.PORT || 3000);
