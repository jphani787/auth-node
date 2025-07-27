const express = require("express");
require("dotenv").config();
const connectDb = require("./database/db");
const bookRouter = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const homeRouter = require("./routes/homeRoutes");
const adminRouter = require("./routes/adminRoutes");
const imageRouter = require("./routes/imageRoutes");
const app = express();

const PORT = process.env.PORT || 3000;

connectDb();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/image", imageRouter);


app.listen(PORT, ()=>{
    console.log('server is running port', PORT);
})
