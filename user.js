const User = require("../models/Musers");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handelgetuserbyid(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

async function handelupdateuserbyid(req, res) {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json({ status: "Success", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
}

async function handeldeletebyid(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ status: "Success", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}

async function createnewuser(req, res) {
  const { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const newUser = new User({ first_name, last_name, email });
    const result = await newUser.save();
    res.status(201).json({ msg: "User created successfully", user: result });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user", error });
  }
}

module.exports = {
  handleGetAllUsers,
  handelgetuserbyid,
  handelupdateuserbyid,
  handeldeletebyid,
  createnewuser,
};
