const express = require("express");
const { handleGetAllUsers, handelgetuserbyid, handelupdateuserbyid, handeldeletebyid, createnewuser } = require("../controllers/user"); // Import the controller

const router = express.Router();

// Root route
router.get("/user/:id", handelgetuserbyid);

// Fetch all users from MongoDB using the controller function
router.get("/users", handleGetAllUsers); // Changed to "/users" to avoid duplicate "/"

// CRUD Operations for Users
router.route("/:id")
  .get(handelgetuserbyid) 
  .patch(handelupdateuserbyid)
  .delete(handeldeletebyid);

// Create a new user
router.post("/create", createnewuser); 

module.exports = router;
