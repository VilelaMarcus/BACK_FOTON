const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';


// Generate JWT
const generateToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


const registerUser: ApiHandler = async ({ request, response }) => {
    console.log({request});
    const { tecnic_name, email, password } = request.body;
    const prisma = new PrismaClient();
    
        if (!tecnic_name || !email || !password) {
        response.status(400);
        throw new Error("Please add all fields");
        }
    
        // check if user exists
        const userExists = await prisma.user.findUnique({
            where: {
                tecnic_name: email,
            },
        });
        if (userExists) {
        response.status(400);
        throw new Error("User already exists");
        }
    
        // create hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const data = {                
            ...(tecnic_name && { tecnic_name }),          
            ...(email && { email }),          
            ...(hashedPassword && { password: hashedPassword, }),                   
        };

        // create user
        const user = await prisma.user.create({
            data: data,
        });
    

        
        await prisma.$disconnect();
        if (user) {            
        response.status(201).json({
            _id: user.id,
            tecnic_name: user.tecnic_name,
            email: user.email,
            token: generateToken(user.id),
        });
        } else {
        response.status(400);
        throw new Error("Invalid user data");
        }
}

  
export default registerUser;
