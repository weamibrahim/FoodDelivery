const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserController = {};

// Register a new user
UserController.register = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, password, role, phone , address } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    // Check if user already exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await new User({
      firstName,
      lastName,
      phone,
      address,
      email,
      password: hashedPassword,
      role,
      
    });
    // Save user to database
    await newUser.save();
    res.status(201).json({ newUser, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// Login a user
UserController.login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(accessToken);

    res.status(200).json({ user, message: "Login successful", accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all users
UserController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update a user
UserController.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 



// Delete a user
UserController.deleteUser = async (req, res) => { 
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




module.exports = UserController;
