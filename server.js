
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const People = require('./models/people');
const envPath = path.resolve(__dirname, '/users/eyabg/Desktop/rest/config', '.env');
const dotenv = require('dotenv');
dotenv.config({ path: envPath });


// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
   })
   .then(() => {
      console.log('Connected to MongoDB'+process.env.DB);
     })
     .catch((error) => {
       console.error('Error connecting to MongoDB:', error);
    });

   

// GET route to return all users
app.get('/people', async (req, res) => {
  try {
    const users = await People.find();
    console.log('users', users);
    res.send(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST route to add a new user to the database
app.post('/people', async (req, res) => {
  try {
    const { lastName, firstName, age ,email } = req.body;
    const newUser = await People.create({ lastName, firstName,age ,email });
    console.log('New user:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});


// PUT route to edit a user by ID
app.put('/people/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { lastName, firstName, age } = req.body;
    
    const updatedUser = await People.findOneAndUpdate(
      { email },
      { lastName, firstName, age },
      { new: true }
    );
    
    console.log('Updated user:', updatedUser);
    
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});


// DELETE route to remove a people by ID
app.delete('/people/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await People.findByIdAndRemove(id);
    
    if (deletedUser) {
      console.log('Deleted user:', deletedUser);
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


