const AdminModel = require("../models/Admin");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

const AuthenticationController = {
  Signup: async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      
      const { email, password, userName } = request.body;
      if (!email || !password || !userName) {
        return response.status(400).json({
          message: "Required fields are missing",
          status: false,
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if email already exists
      const existingUser = await AdminModel.findOne({
        where: { email: email }
      });
  
      if (existingUser) {
        return response.status(400).json({
          message: "Email already exists",
          status: false,
        });
      }
  
      const user = await AdminModel.create({
        email: email,
        password: hashedPassword,
        user_name: userName,
      });
  
      response.status(201).json({
        message: "User created successfully",
        status: true,
        user: user,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        message: "Internal server error",
        status: false,
        error: error.message,
      });
    }
  },
  
  Login: async (request, response) => {
    try {
      const { email, password, userName } = request.body;
  
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      if (!email || !password || !userName) {
        return response.status(400).json({
          message: "Required fields are missing",
          status: false,
        });
      }
  
      // Check if the user exists
      const user = await AdminModel.findOne({
        where: { email: email }
      });
  
      if (!user) {
        return response.status(401).json({
          message: "Invalid email or password",
          status: false,
        });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return response.status(401).json({
          message: "Invalid email or password",
          status: false,
        });
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '24h' } 
      );
  
      response.status(200).json({
        message: "Login successful",
        status: true,
        token: token,
        user: { id: user.id, email: user.email, user_name: user.user_name },
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        message: "Internal server error",
        status: false,
        error: error.message,
      });
    }
  },
  
};

module.exports = AuthenticationController;
