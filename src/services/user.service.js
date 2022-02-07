import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config("./.env");


const Login_Token=process.env.TOKEN
//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
const UnHashedpassword=body.Password
const HashedPassword=await bcrypt.hash(UnHashedpassword,10)
body.Password=HashedPassword
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};


export const login= async (body)=>{
  const findUser=await User.find({Email:body.Email})
  if(findUser){

 const IsMatch=await bcrypt.compare(body.Password,findUser[0].Password)
 if(IsMatch){

 const token= await jwt.sign({
    Email:findUser[0].Email,
    ID:findUser[0]._id
  },Login_Token)

   return token;
 }
  }else{
    throw{
      code:HttpStatus.NOT_FOUND,
      message:"Email Id Not found"
    }
  }

  return ("login")
}