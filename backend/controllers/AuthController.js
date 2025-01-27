import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import User from "../models/UserModel.js";
dotenv.config();
export const SignUp = async (req, res) => {
    const { username,email,password } = req.body;
    try {
       const emailExists=await User.findOne({email});
       if(emailExists) return res.status(400).json({message:"Email already exists"});
       const userNameExists=await User.findOne({username});
       if(userNameExists) return res.status(400).json({message:"Username already exists"});
       const salt = await bcrypt.genSalt(12);
       const hashPassword=await bcrypt.hash(password,salt);
       const newUser=new User({
        username,
        email,
        password:hashPassword
       });
       if(newUser){
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,   
        });
       }
       else{
        res.status(400).json({message:"Error in creating user"});
       }
    } catch (error) {
      console.log("error in signup controller",error);
      res.status(500).json({ message: 'Error during signup', error });        
    }
};
export const login=async(req,res)=>{
    const { email,password } = req.body;
    try {
      const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Email not found"});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!isPasswordCorrect) return res.status(400).json({message:"Invalid password"});
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,  
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        console.log("error in login controller",error);
        res.status(500).json({ message: 'Error during login', error });
    }
}
export const logout = (req, res) => {
    try {
      res.cookie('jwt', '', { maxAge: 0 });
      res.status(200).json({ message: "logged out successfully" })
    } catch (error) {
      console.log("error in logout controller")
      res.status(500).json({ error: "internal server error" })
    }
  };