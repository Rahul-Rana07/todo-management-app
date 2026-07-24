import mongoose from "mongoose"
import { trim } from "zod";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
    email : {type : String , unique : true ,required : true ,trim : true ,lowecase : true},
    password : {type : String , required : true},
    name : String
})

const todo = new Schema({
    title : {type : String , required : true , trim : true},
    done : {type : Boolean , default : false},
    userId : ObjectId,
    collectionId : ObjectId
},
{
    timestamps: true
})

const collection = new Schema({
    name : {type : String , required : true , trim : true},
    icon : {type : String , default : "folder"},
    userId : ObjectId
},
{
    timestamps: true
})



const userModel = mongoose.model('users' , user); // collections names in 'users / todos'
const todoModel = mongoose.model('todos' , todo);
const collectionModel = mongoose.model("collections", collection);

export {userModel , todoModel ,collectionModel} 