
const moongose=require("mongoose");

const connectDB = async()=>{
    try{
        const conn = await moongose.connect(process.env.MONGO_URL);
        console.log(`mongoose connect ${conn.connection.host}`);
    }catch(Err){
        console.error(Err);
        process.exit(1);
    }
};
module.exports=connectDB;

