const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtSecret = "MySecretKeyIsIkahtras"
const bcrypt = require('bcryptjs');

router.post("/createuser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 })

    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location

            })
            res.json({ success: true });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "try logging with correct credentials" })
            }
            // res.json({ success: true });

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "try logging with correct credentials" })
            }


            const data = {
                user : {
                    id : userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret )
            return res.json({ success: true, authToken: authToken })


        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


module.exports = router;










// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const saltRounds = 10;

// // Create User (Signup)
// router.post("/createuser",
//     body('email').isEmail(),
//     body('name').isLength({ min: 5 }),
//     body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try {
//             // Check if user already exists
//             let existingUser = await User.findOne({ email: req.body.email });
//             if (existingUser) {
//                 return res.status(400).json({ errors: [{ msg: "User already exists" }] });
//             }

//             // Hash the password before saving
//             const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

//             await User.create({
//                 name: req.body.name,
//                 password: hashedPassword, // Store hashed password
//                 email: req.body.email,
//                 location: req.body.location
//             });

//             res.json({ success: true });

//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ errors: [{ msg: "Server error" }] });
//         }
//     }
// );

// // Login User
// // Login User
// router.post("/loginuser", [
//     body('email').isEmail(),
//     body('password', 'Password must be at least 5 characters').isLength({ min: 5 })],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try {
//             let userData = await User.findOne({ email: req.body.email });
//             if (!userData) {
//                 return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
//             }

//             // ✅ Compare the hashed password stored in the database
//             const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
//             if (!passwordMatch) {
//                 return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
//             }

//             res.json({ success: true });

//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ errors: [{ msg: "Server error" }] });
//         }
//     }
// );

// module.exports = router;
