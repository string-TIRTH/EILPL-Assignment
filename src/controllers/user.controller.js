const UserModel = require('../models/user.model');

const createUser =  async (req, res) => {
    try {
      const { firstName,lastName,email } = req.body;
      const userExists = await UserModel.countDocuments({email:email});
      if(userExists != 0){
        return res.status(208).json({
            errorMsg:'user already exists'
        })
      }
      const newUser = await UserModel({
        firstName:firstName,
        lastName:lastName,
        email:email,
      }).save();
      if(newUser){
        return res.status(201).json({
            errorMsg:'user created successfully'
        })
      }else{
        return res.status(400).json({
            errorMsg:'error while creating user'
        })
      }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};
const getAllUsers =  async (req, res) => {
  try {
    const books = await BookModel.find({},{_id:0,__v:0})
    if(books.length != 0){
      return res.status(200).json({
          'books':books,
          'length':books.length,
      })
    }else{
      return res.status(200).json({
          'books':books,
          'length':0,
      })
    }
  } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error });
  }
};
module.exports = {
    createUser,
    getAllUsers
}