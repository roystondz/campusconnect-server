import {Request,Response} from "express"
import jwt from "jsonwebtoken"
import bycrypt from "bcrypt"
import prisma from "../config/db"


export const register = async(req:Request,res:Response)=>{
    const {username,email,password}=req.body;
    const hashedPassword = await bycrypt.hash(password,10);
    const newUser = await prisma.user.create({
        data:{username:username,email:email,password:hashedPassword,role:'USER'
        },
    })

    const token =jwt.sign({
        id:newUser.id,role:newUser.role},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({token});
}

export const login = async (req:Request,res:Response)=>{
    const{email,password}=req.body;

    const user = await prisma.user.findUnique({where:{email}});

    if(!user)
        return res.staus(404).json({error:"User not found"});

    const isValid = await bycrypt.compaer(password,user.password);
    if(!isValid)
        return res.staus(401).json({error:"Invalid credentails"});

    const token =jwt.sign({
        id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({token});

}


