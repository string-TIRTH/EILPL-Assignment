const validationPOST = (schema) => async (req, res, next) => {
    const { body } = req;
    try {
      await schema.validate(body);
      next();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
        message: "error at middleware",
      });
    }
  };
  
const validationGET = (schema) => async (req, res, next) => {
    const { params } = req;
    try {
      await schema.validate(params);
      next();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
        message: "error at middleware",
      });
    }
  };
  module.exports = { validationPOST, validationGET };
  