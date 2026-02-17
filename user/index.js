const express = require("express");
const app = express();
app.use(express.json())
const users = [
    { att: 80, uid: 108623, totalsub: 12, bonus: 20, name: "jilan" },
    { att: 100, uid: 108757, totalsub: 15, bonus: 30, name: "ammar" },
    { att: 20, uid: 108726, totalsub: 18, bonus: 10, name: "nitish" },
    { att: 50, uid: 108952, totalsub: 6, bonus: 60, name: "devilal" }
];

app.get("/", (req, res) => {
    res.send("Express server is running");
});


app.get("/user", (req, res) => {
  console.log(users)
  res.status(200).json(users);
});

// app.get("/users/:test", (req, res) => {
//   console.log(req.params);
//   console.log("first code")
//   res.status(200).json(users);
// });


app.get("/user/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const user = users.find(u => u.uid === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});




app.post("/user", (req, res) => {
    const newUser = {
        att: req.body.att,
        uid: req.body.uid,
        totalsub: req.body.totalsub,
        bonus: req.body.bonus,
        name: req.body.name
    };


    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});





app.put("/user/:uid", (req, res) => {

    const userId = Number(req.params.uid);
    const index = users.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = {
        att: req.body.att,
        uid: userId,   // important: same uid rakho
        totalsub: req.body.totalsub,
        bonus: req.body.bonus,
        name: req.body.name
    };

    res.status(200).json({
        message: "User replaced",
        user: users[index]
    });

});






app.patch("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.att !== undefined) user.att = req.body.att;
  if (req.body.totalsub !== undefined) user.totalsub = req.body.totalsub;
  if (req.body.bonus !== undefined) user.bonus = req.body.bonus;
  if (req.body.name !== undefined) user.name = req.body.name;

  res.status(200).json({
    message: "User partially updated",
    user
  });
});






app.delete("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser[0]
  });
});





// app.delete("/user/:name", (req, res) => {
//   const userName = req.params.name;

//   const index = users.findIndex(
//     u => u.name.toLowerCase() === userName.toLowerCase()
//   );

//   if (index === -1) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const deletedUser = users.splice(index, 1);

//   res.status(204).json({
//     message: "User deleted by name",
//     user: deletedUser[0]
//   });
// });






app.listen(3000, () => {
    console.log("Server started on port 3000");
});