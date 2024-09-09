const moment  = require("moment");
const yup = require("yup");

const issueBook = yup.object({
    bookName: yup.string().min(3).max(255).required(),
    userId: yup.string().min(3).max(25).required(),
    issueDate: yup.string().min(3).max(25).required(),
});

const returnBook = yup.object({
    bookName: yup.string().min(3).max(255).required(),
    userId: yup.string().min(3).max(25).required(),
    returnDate: yup.string().min(3).max(25).required(),
});
const rentGeneratedByBookName = yup.object({
    bookName: yup.string().min(3).max(255).required(),
});
const getIssueListByBookName = yup.object({
    bookName: yup.string().min(3).max(255).required(),
});
const getIssueListByUserId = yup.object({
    userId: yup.string().min(3).max(25).required(),
});
const getIssuesByDateRange = yup.object({
    start: yup.string().required(),
    end: yup.string().default(moment().format("DD-MMM-YYYY HH:mm:ss")),
});

module.exports = {
    issueBook,
    returnBook,
    rentGeneratedByBookName,
    getIssueListByBookName,
    getIssueListByUserId,
    getIssuesByDateRange
};
