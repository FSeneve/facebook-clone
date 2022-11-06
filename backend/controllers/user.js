const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validateEmail, validateLength, validateUsername} = require('../helpers/validation');
const {generateToken} = require('../helpers/tokens');
const {sendVerificationEmail} = require('../helpers/mailer');

exports.home = (req, res)=>{
    res.send("User data");
}

exports.register = async (req, res)=>{
    try {
        const {
            first_name,last_name,
            email, username,
            password,
            bYear, bMonth, bDay,gender
        } = req.body;

        if (!validateEmail(email)){
            return res.status(400).json({
                message: "Invalid email address"
            });
        }

        const checkEmail = await User.findOne({email})

        if (checkEmail){
            return res.status(400).json({
                message: "Email already in use"
            });
        }

        // const checkUsername = await User.findOne({username})

        // if (checkUsername){
        //     return res.status(400).json({
        //         message: "Username already in use"
        //     })
        // }

        if(!validateLength(first_name, 3, 30)){
            return res.status(400).json({
                message: "First name must be between 3 and 30 characters"
            });
        }

        if(!validateLength(last_name, 3, 30)){
            return res.status(400).json({
                message: "Last name must be between 3 and 30 characters"
            });
        }

        if(!validateLength(password, 6, 40)){
            return res.status(400).json({
                message: "Password must be between 6 and 40 characters"
            });
        }

        const cryptedPassword = await bcrypt.hash(password,12)

        let tempUsername = first_name + last_name;
        let newUsername = await validateUsername(tempUsername);
    
        const user = new User({
            first_name,
            last_name,
            username: newUsername,
            email,
            password: cryptedPassword,
            bYear,
            bMonth,
            bDay,
            gender
        });
    
        const newUser = await user.save();

        const emailVerificationToken = generateToken({id: newUser._id.toString()}, '30m');
        
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

        sendVerificationEmail(newUser.email, newUser.first_name, url);

        const token = generateToken({id: newUser._id.toString()}, '7d');

        res.send({
            id: newUser._id,
            username: newUser.username,
            last_name: newUser.last_name,
            first_name: newUser.first_name,
            token: token,
            verified: newUser.verified,
            message: "Register success! Please activate your account"
        });

        // res.json(newUser);
    } catch (error) {
       res.status(500).json({message: error.message}); 
    }
}

exports.activateAccount = async(req, res)=>{
    try {
        //Get the user's token
        const {token} = req.body;
        //Decoded the user's token: {id: "gdjjsjsslld"} from jwt
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        //Check the user in the database
        const checkUser = await User.findById(user.id);
        if(checkUser.verified==true){
            return res.status(400).json({message: "This email is already activated!"});
        }else{
            await User.findByIdAndUpdate(user.id, {verified: true});
            return res.status(200).json({message: "Account has been activated successfully!"});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "The email you entered is not connected to an account!"});
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if(!passwordCheck){
            return res.status(400).json({message: "Invalid credentials. Please try again!"});
        }

        const token = generateToken({id: user._id.toString()}, '7d');

        res.send({
            id: user._id,
            username: user.username,
            last_name: user.last_name,
            first_name: user.first_name,
            token: token,
            verified: user.verified,
            message: "You are login!"
        });

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}