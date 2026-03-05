const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5500;

app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/assignment")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Could not connect", err));



// Schemaa
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});


// Model
const User = mongoose.model("User", userSchema);


// Create Single User
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


// Create Multiple Users
app.post("/multiusers", async (req, res) => {
    try {
        const users = await User.insertMany(req.body);
        res.status(201).send(users);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


// Get All Users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


// Get User by ID
app.get("/users/:id", async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(user);

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


// Update User (PUT)
app.put("/users/:id", async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(user);

    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


// Partial Update (PATCH)
app.patch("/users/:id", async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(user);

    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


// Delete User
app.delete("/users/:id", async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send("User deleted successfully");

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


// Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});