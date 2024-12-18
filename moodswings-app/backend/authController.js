const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./userModel');

// Signup User Function (Updated with detailed logging)
async function signupUser(req, res) {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already registered.' });
    }

    // Trim and hash the password
    const trimmedPassword = password.trim();
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    /* Debug logs for troubleshooting
    console.log('Signup - Plain Password:', password); Debug log
    console.log('Signup - Trimmed Password:', trimmedPassword); Debug log
    console.log('Signup - Hashed Password:', hashedPassword);  Debug log*/

    // Create new user with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();
    console.log('User Created:', newUser); // Debug log to confirm user was created with correct data
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error signing up user:', error); // Improved error logging
    res.status(500).json({ message: 'Error signing up user.', error });
  }
}

// Login User Function (Updated)
async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username.' });
    }

    // Debug log to print stored hashed password directly from database
    console.log('Login - User from DB:', user); // Log the entire user object, including hashed password

    // Trim the password to avoid extra spaces
    const trimmedPassword = password.trim();

    // Compare the trimmed password with the stored hashed password
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);

    /* Debug logs for troubleshooting
    console.log('Login - Entered Password:', trimmedPassword); 
    console.log('Login - Stored Hashed Password:', user.password); 
    console.log('Login - Password Match Result:', isMatch);*/

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error); // Improved error logging
    res.status(500).json({ message: 'Error logging in user.', error });
  }
}

module.exports = { signupUser, loginUser };