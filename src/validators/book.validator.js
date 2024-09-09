const yup = require("yup");

const createBook = yup.object({
    bookName: yup.string().min(3).max(255).required(),
    category: yup.string().min(3).max(25).required(),
    rentPerDay: yup.number().moreThan(0).required()
});

const findBookByName = yup.object({
    bookName: yup.string().max(255).required(),
});
const findByRent = yup.object({
    start: yup.number().moreThan(-1).default(0),
    end: yup.number().moreThan(-1).default(0),
});

const findBookByCategoryNameRent = yup.object({
    category: yup.string().min(3).max(25).required(),
    bookName: yup.string().min(3).max(255).required(),
    start: yup.number().moreThan(-1).default(0),
    end: yup.number().moreThan(-1).default(0),
});

module.exports = {
    createBook,
    findByRent,
    findBookByName,
    findBookByCategoryNameRent,
};
