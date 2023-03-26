require('dotenv').config();
const app = require("./app");
const connectWithDb = require('./config/db')


const cloudinary = require('cloudinary')
//connection with database
connectWithDb();


//clodinary congig goes here
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT, () => {
    console.log(`server is running at port : ${process.env.PORT}`);
});