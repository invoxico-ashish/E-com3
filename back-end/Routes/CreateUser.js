const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "qwertyuioplkjhgfdsazxcvbnmlpoi&*";

// simple api without any validation rule 

// router.post("/createuser", async (req, res) => {
//     try {
//         await User.create({
//             name: req.body.name,
//             password: req.body.password,
//             email: req.body.email,
//             location: req.body.location
//         });
//         res.json({ success: true });
//     } catch (err) {
//         console.log(err);
//         res.json({ success: false });
//     }
// });

//WITH VALIDATION RULES-----------

router.post("/createuser", [
    body("name").isLength({ min: 5 }),
    body("email", "Incorrect email").isEmail(),
    body("password", "Incoreect Password").isLength({ min: 5 })

],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // console.log(req.body);

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location
            });

            res.json({ success: true });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    });



router.post("/loginuser", [
    body("email", "Incorrect email").isEmail(),
    body("password", "Incoreect Password").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let email = req.body.email;
        // let password = 
        try {
            let userData = await User.findOne({ email });
            if (!email) {
                return res.status(400).json({ error: "try with correct credentials" });
            }

            const pasCompare = await bcrypt.compare(req.body.password, userData.password);


            if (!pasCompare) {
                return res.status(400).json({ error: "Try with correct credentials" });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ Success: "true", authToken: authToken });

        } catch (err) {
            console.log(err);
            res.json({ Success: "false" })

        }
    })


// router.post("/loginuser", [

//     body("email").isEmail(),
//     body("password").isLength({ min: 5 })
// ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             res.status(400).json({ errors: errors.array() })
//         }
//         let email = req.body.email;
//         try {
//             let userData = await User.findOne({ email })

//             if (!email) {
//                 return res.status(400).json({ errors: "Invalid Email" });
//             }

//             if (req.body.password != userData.password) {
//                 return res.status(400).json({ errors: "Invalid PAssword" });
//             }

//             return res.status(200).json({ Success: "true" });

//         }
//         catch (err) {
//             console.log(err);
//             res.json({ Success: "false" })

//         }
//     })

module.exports = router;