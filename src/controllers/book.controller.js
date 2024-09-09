const BookModel = require('../models/book.model');

const createBook =  async (req, res) => {
    try {
      const { bookName,category,rentPerDay } = req.body;
      const bookExists = await BookModel.countDocuments({bookName:bookName,category:category});
      if(bookExists != 0){
        return res.status(208).json({
            errorMsg:'book already exists'
        })
      }
      const newBook = await BookModel({
        bookName:bookName,
        category:category,
        rentPerDay:rentPerDay,
      }).save();
      if(newBook){
        return res.status(201).json({
            messsage:'book created successfully'
        })
      }else{
        return res.status(400).json({
            errorMsg:'error while creating book'
        })
      }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }
};

const findBookByName =  async (req, res) => {
    try {
      const { bookName } = req.query;
      const books = await BookModel.find({
        bookName: {$regex: bookName, $options: "i"}
      },{_id:0,__v:0})
      
      console.log(books)
      if(books.length != 0){
        return res.status(200).json({
            'books':books,
            'length':books.length,
            'query':req.params
        })
      }else{
        return res.status(200).json({
            'books':books,
            'length':0,
            'query':req.params
        })
      }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }
};

const findByRent =  async (req, res) => {
    try {
      const { start,end } = req.query;
      const books = await BookModel.find({
        rentPerDay:{$gte : start,$lte:end},
      },{_id:0,__v:0})
      
      console.log(books)
      if(books.length != 0){
        return res.status(200).json({
            'books':books,
            'length':books.length,
            'query':req.params
        })
      }else{
        return res.status(200).json({
            'books':books,
            'length':0,
            'query':req.params
        })
      }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }
};
const findBookByCategoryNameRent =  async (req, res) => {
    try {
      const { category,bookName,start,end } = req.query;
      const books = await BookModel.find({
        category:category,
        bookName: {$regex: bookName, $options: "i"},
        rentPerDay:{$gte : start,$lte:end},
      },{_id:0,__v:0})
      
      console.log(books)
      if(books.length != 0){
        return res.status(200).json({
            'books':books,
            'length':books.length,
            'query':req.params
        })
      }else{
        return res.status(200).json({
            'books':books,
            'length':0,
            'query':req.params
        })
      }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }
};
const getAllBooks =  async (req, res) => {
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
    createBook,
    findBookByName,
    findByRent,
    findBookByCategoryNameRent,
    getAllBooks,
}