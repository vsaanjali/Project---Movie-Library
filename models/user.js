//importing mongoose module
const mongoose=require("mongoose")

//defining schema for user entries
const userSchema = new mongoose.Schema({
    email:{ 
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    }
})
//exporting ongoose model for user using defined schema
module.exports= mongoose.model("User", userSchema)
