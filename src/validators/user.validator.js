const yup = require("yup");

const createUser = yup.object({
  firstName: yup.string().min(3).max(255).required(),
  lastName: yup.string().min(3).max(25).required(),
  email: yup.string().email().required(),
});

module.exports = {
  createUser,
};
