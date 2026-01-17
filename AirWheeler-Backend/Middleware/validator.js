const { body, validationResult } = require("express-validator");

const formValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('First name must be between 1 and 100 characters'),
    body('phone')
    .optional()
    .trim()
    .isLength({ min: 7, max: 15 })
    .isNumeric()
    .withMessage('Phone number must be between 7 and 15 characters'),
    body('description')
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
];

const validateForm=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }  
    next();
}

module.exports={formValidator,validateForm};