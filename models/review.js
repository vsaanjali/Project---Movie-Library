//importing mongoose module
const mongoose=require("mongoose")

//defining schema for review entries
const ReviewSchema = new mongoose.Schema({
    title:{ 
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    movieID:{ type:String,
        required:true
    },
    user:{ type:String,
        required:true
    }
})

//exporting ongoose model for review using defined schema
module.exports= mongoose.model("Review", ReviewSchema)
