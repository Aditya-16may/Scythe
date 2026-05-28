const express = require("express")
const app = express();
const path = require("path")
const userModel = require("./models/user")
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const cookieParser = require("cookie-parser");
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")
const index = require("./routes/index");
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
app.use(
    session({
        secret:process.env.SESSION_KEY,
        resave:false,
        saveUninitialized : false,
    })
);

app.use(flash());

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", index);

app.listen(3000);