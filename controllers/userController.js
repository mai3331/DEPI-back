const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password ,Admin } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: 'User already exists!' });

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ name, email, password: hashedPassword,Admin});

        await newUser.save();

        return res.status(201).json({ message: 'User has been registered!' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};


exports.login = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(400).json({ message: 'Invalid Credentials!' });

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid Credentials!' });

        const token = jwt.sign({ id: existingUser._id }, 'secretKey', { expiresIn: '1h' });

        return res.json({ message: 'Login Successful', token });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateUser=async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.user._id)
        if(user){
            user.name =name || user.name;
            user.email = email || user.email;
            if (password) {
                user.password = await bcrypt.hash(password, 10); // Hashing the password
            }
            const updated= await user.save()
            res.json({
                _id:updated.id,
                name:updated.name,
                password:updated.password,
                email:updated.email,
                Admin:updated.Admin,
                token : jwt.sign({ id: updated._id }, 'secretKey', { expiresIn: '1h' })
            })
        }else{
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}
exports.getLikedMovies=async(req,res)=>{
try {
    const user = await User.findById(req.user._id).populate('likedMovies');
    if(user){
        res.json(user.likedMovies)
    }else{
        res.status(400)
        throw new Error('user not found')
    }
} catch (error) {
    return res.status(500).json({ message: 'Server error', error });
}
}
exports.addToFavourites=async(req,res)=>{
    const { movieId }=req.body;
    try {
        const user = await User.findById(req.user._id);
        if(user)
        {
          if(user.likedMovies.includes(movieId)){
            res.status(400);
            throw new Error(" movie already added to favorites");
          }else{
              user.likedMovies.push(movieId);
              await user.save()
              res.json(user.likedMovies)   
          }
        }else{
            res.status(404);
            throw new Error("movie not found");
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}
exports.removeFavorites=async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user){
            user.likedMovies=[];
            await user.save();
            res.json({message:"all favourites removed"})
        }else{
        res.status(400)
        throw new Error('user not found')
    }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}

