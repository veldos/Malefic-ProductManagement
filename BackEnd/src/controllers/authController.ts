//(login, signup, logout)
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
// import authService from '../services/authService';

const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNjA1NTA0NSwiaWF0IjoxNzE2MDU1MDQ1fQ.xbzjVK_ZQ12MOubd_UTLinLIrpuREzyiMZnMf3X4xoc';

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error registering user', error);
      res.status(500).json({ message: 'Server error', error: error });
    }
};
export const login = async (req: Request, res: Response) => {
    try{
        const { email , password }= req.body;
        const user = await User.findOne({email});

        if(!user || !await bcrypt.hash(password, user.password)){
            return  res.status(400).json({message : ' Invalid password or email'});
        }
        const token = jwt.sign({ userId: user._id}, JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({ token });
    }catch(error){
        res.status(500).json({ message: 'Error logging in', error });


    }
}

export const logout = (req:Request, res:Response) =>{

    res.status(200).json({ message: 'Logged out successfully' });
}