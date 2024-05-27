const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register=async(req,res)=>{
  const { username, password, email } = req.body;
console.log(username,password,email)
  try {
    const user = await User.create({ username, password, email });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { username, password,email } = req.body;

  console.log('Login request body:', req.body); 

  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(password,user.password)
   // const isMatch = await bcrypt.compare(password, user.password);
    if(password == user.password){
isMatch=true

    }
    if (!isMatch) {
      console.log('Invalid credentials for email:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getProfile = async (req, res) => {
  res.json(req.user);
};

