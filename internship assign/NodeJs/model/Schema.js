const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        id:{
                type: Number,
                required :true
        },
        title:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        category:{
         type: String,
         required:true
        },
        image:{
            type: String,
            required:true
        },
        sold:
        {
            type: Boolean,
            required:true
        },
        dateOfSale:{
            type: Date,
            required:true
        }

    }
)
const user = mongoose.model("salesData",schema);
module.exports=user;