import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Provide name"]
    },
    email: {
        type :String,
        require:[true,"provide email"],
        unique:true
    },
    password :{
        type:String,
        require:[true,"provide passward"]
    },
    avatar:{
        type:String,
        default:""
    },
    mobile:{
        type:Number,
        defult :null
    },
    refresh_token:{
        type:String,
        defult :""
    },
    verify_email:{
        type:Boolean,
        defult :false
    },
    last_login_date : {
        type:Date,
        defult :""
    },
    status:{
        type:String,
        enum:["Active","Inactive","Suspanded"],
        defult :"Active"
    },
    address_details:{
        type: mongoose.Schema.ObjectId,
        ref:'address'
    },
    shopping_cart:{
        type: mongoose.Schema.ObjectId,
       ref:'cardProduct'
    },
    orderHistory:{
        type: mongoose.Schema.ObjectId,
       ref:'order'
    },
    forgot_password_otp:{
        type : String,
        default:null
    },
    forgot_password_expiry:{
        type:Date,
        default:""
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    }
},{
    timestamps:true
})
const UserModel = mongoose.model("User",userSchema) 
export default UserModel