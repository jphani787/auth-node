const mongoose = require("mongoose");
// require('dotenv').config();
// mongoose.connect("mongodb+srv://jphanindra787:8SX14wfKXHUm7H9N@cluster0.hktuhi9.mongodb.net/")
// .then(()=>console.log("Database connected successfully"))
// .catch((e)=> console.log(e));

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully")
    }catch(error){
        console.error("Error to connect database", error);
        process.exit(1);
    }
}

module.exports = connectDb;

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     age: Number,
//     isActive: Boolean,
//     tags: [String],
//     createdAt: {type: Date, default: Date.now}
// })

// const User = mongoose.model("User", userSchema);

// const runQuery = async () => {
//     try {
//         // const newUser = await User.create({
//         //     name: "Phani",
//         //     email: "phani@gmail.com",
//         //     age: 30,
//         //     isActive: true,
//         //     tags: ["developer", "designer", "manager"]
//         // });

//         // const newUser = new User({
//         //     name: "naga",
//         //     email: "naga@gmail.com",
//         //     age: 62,
//         //     isActive: false,
//         //     tags: ["manager"]
//         // });
//         // await newUser.save();
//         const allUsers = await User.find().select('name email age').sort({age: -1})
//         console.log("Created new user -> ", allUsers);
//     } catch(e) {
//         console.log("Error ->", e);
//     } finally {
//         await mongoose.connection.close();
//     }
// }

// runQuery();