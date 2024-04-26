const { response } = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs")

const getAllUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "no users found" });
  }
  return res.status(200).json({ users });
};

const signup = async (req, res) => {
  console.log(req);
  const {name, email, password} = req.body;

  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existinguser) {
    return res.status(400).json({ message: "user already exist ! " });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password,
  });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

const login = async(req,res)=>{
    const {email, password} = req.body;

  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existinguser) {
    return res.status(404).json({ message: "user does not exist ! " });
  }
  const isPasswordCorrect = bcrypt.compareSync(password,existinguser.password)
  if(!isPasswordCorrect){
    return res.status(400).json({message: "incorrect password"})
  }
  return res.status(200).json({message:"Login Successful"})
}
module.exports = {
  getAllUser,
  signup,
  login
};
