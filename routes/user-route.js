const bcrypt = require("bcrypt");
const express = require("express");

const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/current", auth, async (req, res) => {
    //finds user excludes password
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

router.post("/new", async (req, res) => {
    // validate the request body first
    console.log(req.body)
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //check if there is an existing user
    let user = await User.findOne({ email: req.body.username });

    if (user) {
        return res.status(400).send("User already registered.");
    }

    user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send({
        _id: user._id,
        username: user.username,
    });
});


module.exports = router;