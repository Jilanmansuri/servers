const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Day7')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error('Could not connect to MongoDB', err));


// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, "Name Must be atleast 2 character"]
    },
    email: {
        type: String,
        required: [true, "Email Must be there"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password Must be there"],
        minlength: [6, "Password Must be 6 character."]
    },
    role: {
        type: String,
        required: true,
        enum: ["Student", "user", "admin"],
        default: "Mentor"
    }
});

const User = mongoose.model("User", userSchema);


// Test route
app.get('/', (req, res) => {
    res.send("users data");
});


// add one user
// Add a new user
app.post('/add-users', async (req, res) => {
  const {name,email,password,role} = req.body;

  if(!name){
    return res.status(404).send("Name is Required")
  }

  if(!email){
    return res.status(404).send("Email is required ")
  }

  if(!password){
    return res.status(404).send("Password is required ")
  }

  try {
    const user = new User(req.body);

    await user.save();
    res.status(201).send(user);
  }
  catch (err) {
    res.status(400).send(err);
  }
});

app.post("/addusers", async (req, res) => {
    try {
        const users = await User.insertMany(req.body);
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get all users
app.get("/users", async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "user not fount" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});






app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }  // options
        );

        res.json(updatedUser);
    } catch (error) {
        res.json({ error: error.message });
    }
});






app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully",
            deletedUser
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});