const moment = require('moment');
const BookModel = require('../models/book.model');
const TransactionModel = require('../models/transaction.model');
const UserModel = require('../models/user.model');
const issueBook =  async (req, res) => {
    try {
      const { bookName,userId,issueDate } = req.body;
      const user = await UserModel.countDocuments({_id:userId});
      if(user == 0){
        return res.status(400).json({
            errorMsg:'user not found'
        })
      }
      const book = await BookModel.findOne({bookName:bookName},{rentPerDay:1});
      if(!book){
        return res.status(400).json({
            errorMsg:'book not found'
        })
      }
      const issueCheck = await TransactionModel.countDocuments({bookName:bookName,userId:userId,status:"Issued"});
      if(issueCheck != 0){
        return res.status(208).json({
            errorMsg:'book already issued to user'
        })
      }
      
      const newTransaction = await TransactionModel({
        bookName:bookName,
        userId:userId,
        rentPerDay:book.rentPerDay,
        issueDate:moment(issueDate).format('DD-MMM-YYYY HH:mm:ss')??moment().toISOString(),
      }).save();
      if(newTransaction){
        return res.status(201).json({
            messsage:'book issued successfully'
        })
      }else{
        return res.status(400).json({
            errorMsg:'error while issuing book'
        })
      }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }
};

const returnBook =  async (req, res) => {
    try {
      const { bookName,userId,returnDate } = req.body;
      const user = await UserModel.countDocuments({_id:userId});
      if(user == 0){
        return res.status(400).json({
            errorMsg:'user not found'
        })
      }
      const book = await BookModel.findOne({bookName:bookName},{rentPerDay:1});
      if(!book){
        return res.status(400).json({
            errorMsg:'book not found'
        })
      }
      const transaction = await TransactionModel.findOne({bookName:bookName,userId:userId,status:"Issued"});
      if(!transaction){
        return res.status(208).json({
            errorMsg:'book cannot be return without issuing'
        })
      }
      console.log(transaction)
      const bookRentedDay = moment(returnDate).startOf('day').diff(moment(transaction.issueDate).startOf('day'), 'days');
      transaction.returnDate = moment(returnDate).format('DD-MMM-YYYY HH:mm:ss')??moment().format('DD-MMM-YYYY HH:mm:ss'),
      transaction.status = "Returned"
      transaction.payAbleAmount = bookRentedDay*transaction.rentPerDay;
      await transaction.save();
   
    return res.status(200).json({
        messsage:'book returned successfully'
    })
      
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }
};
const getIssueListByBookName =  async (req, res) => {
    try {
      const { bookName } = req.query;
      const book = await BookModel.findOne({bookName:bookName},{rentPerDay:1});
      if(!book){
        return res.status(400).json({
            errorMsg:'book not found'
        })
      }
      bookIssuedInPast = await TransactionModel.find({bookName:bookName,status:"Returned"},{status:1,_id:0}).populate('userId')
      bookIssued = await TransactionModel.find({bookName:bookName,status:"Issued"},{status:1,_id:0}).populate('userId')
      bookIssuedTotal = await TransactionModel.countDocuments({bookName:bookName})
      
    return res.status(200).json({
        bookIssuedInPast:bookIssuedInPast,
        bookIssued:bookIssued,
        bookIssuedTotal:bookIssuedTotal
    })
      
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }
};

const getIssueListByUserId =  async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await UserModel.countDocuments({_id:userId});
    if(user == 0){
      return res.status(400).json({
          errorMsg:'book not found'
      })
    }
    bookIssues = await TransactionModel.find({userId:userId});
    
  return res.status(200).json({
    bookIssues:bookIssues,
  })
    
  } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error });
  }
};

const getIssuesByDateRange =  async (req, res) => {
  try {
    const { start,end } = req.query;
    const issues = await TransactionModel.find({}).populate('userId');
    const filteredIssues = [];
    for(const issue of issues){

      if(moment(issue.issueDate).isSameOrAfter(moment(start)) && moment(issue.issueDate).isSameOrBefore(moment(end))){
        filteredIssues.push(issue)
      }
    }
  return res.status(200).json({
    issues:filteredIssues,
  })
    
  } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error });
  }
};
const rentGeneratedByBookName =  async (req, res) => {
    try {
      const { bookName } = req.query;
      const book = await BookModel.findOne({bookName:bookName},{rentPerDay:1});
      if(!book){
        return res.status(400).json({
            errorMsg:'book not found'
        })
      }
      aggregateResult = await TransactionModel.aggregate([
        {
            $match:{bookName:bookName}
        },
        {
            $group:{
                _id:"$bookName",
                generatedRent:{
                    $sum:"$payAbleAmount"
                }
            }
        },
        {
            $project:{
                "bookName" : "$_id",
                generatedRent: 1,
                _id:0
            }
        }
      ])
      
    return res.status(200).json({
        bookName:aggregateResult[0].bookName,
        generatedRent:aggregateResult[0].generatedRent,
    })
      
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }
};



module.exports = {
    issueBook,
    returnBook,
    getIssueListByBookName,
    rentGeneratedByBookName,
    getIssueListByUserId,
    getIssuesByDateRange
}