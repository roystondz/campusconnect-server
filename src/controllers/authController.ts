import { NextFunction, Request, Response } from "express";
import { prisma } from "../app"; // Adjust the import path if necessary

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password, usn, fname, lname, pno } = req.body;

  try {
    const existingUser = await prisma.member.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create the user
    const user = await prisma.member.create({
      data: {
        USN: usn,
        last_name: lname,
        first_name: fname,
        email: email,
        username: username,
        password: password,
        P_no: pno,
      },
    });

    res.status(201).json({ success:true,name:user.first_name}); // Return the created user if necessary
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success:false,error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction)=> {
  const { email, password } = req.body;

  try {
    const user = await prisma.member.findFirst({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords (consider using a hash comparison library for better security)
    const isPasswordValid = (password === user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(user);
    
  

    // Successful login
    res.status(200).json({ success:true,message: "Login successful",name:user.first_name,
        USN:user.USN
    }); // Send user info back or a token
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success:false,error: "Login failed" });
  }
};
