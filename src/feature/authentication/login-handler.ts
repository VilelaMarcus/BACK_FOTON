const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';


// Generate JWT
const generateToken = (id:any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


const loginUser : ApiHandler = async ({ request, response }) => {
    const { email, password } = request.body;
    
    const prisma = new PrismaClient();
  
    if (!email || !password) {
      response.status(400);
      throw new Error("Please add all fields");
    }
  
    // create user
    const user = await prisma.user.findUnique({
      where: {
        tecnic_name: email,
      },
  });


    
    await prisma.$disconnect();
    if (user && (await bcrypt.compare(password, user.password))) {
      response.json({
        _id: user.id,
        name: user.tecnic_name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      response.status(400);
      throw new Error("Invalid credentials");
    }

  
};

  
export default loginUser;
