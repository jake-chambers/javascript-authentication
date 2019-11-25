const bcrypt = require("bcrypt");
const express = require("express");

const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();


router.post("/login", async(req,res) => {
    console.log("attempting to login...")
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({username})

    if (user && bcrypt.compareSync(password, user.password)){
        console.log("authenticated")
        const token = user.generateAuthToken();
        res.append("x-auth-token", token)
        res.send()
    }
    else{
        console.log("unauthenticated")
        res.sendStatus(401)
    }
});

router.get("/profile", auth, async (req,res) => {
    res.send("u made it")
});

router.get("/current", auth, async (req, res) => {
    //first checks jwt using auth middleware
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
});


module.exports = router;