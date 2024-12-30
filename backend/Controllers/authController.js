const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/userModel');

// Signup User Function 
async function signupUser(req, res) {
  const { username, email, password } = req.body;

  try {
    // Validate email format using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Validate username format using regex (alphanumeric, 3-20 characters)
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: 'Username must be alphanumeric and between 3 to 20 characters.' });
    }

    // Stronger password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~])[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]{7,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already registered.' });
    }

    // Trim and hash the password
    const trimmedPassword = password.trim();
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

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

// Login User Function 
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username.' });
    }

    // Stronger password validation regex (same as signup)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~])[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]{10,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Invalid password format.' });
    }

    // Debug log to print stored hashed password directly from database
    console.log('Login - User from DB:', user); // Log the entire user object, including hashed password

    // Trim the password to avoid extra spaces
    const trimmedPassword = password.trim();

    // Compare the trimmed password with the stored hashed password
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);

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
