const { check, validationResult } = require('express-validator');

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

const loginValidation = [
  check('idNumber', 'ID Number is required').notEmpty(),
  check('password', 'Password is required').notEmpty()
];

const registerValidation = [
  check('idNumber', 'ID Number is required').notEmpty(),
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('role', 'Role is required').notEmpty()
];

const fileValidation = [
  check('fileNo', 'File number is required').notEmpty(),
  check('subject', 'Subject is required').notEmpty(),
  check('details', 'Details are required').notEmpty(),
  check('receivedFrom', 'Received from is required').notEmpty(),
  check('branch', 'Branch is required').notEmpty()
];

const branchValidation = [
  check('name', 'Branch name is required').notEmpty()
];

const personnelValidation = [
  check('name', 'Name is required').notEmpty(),
  check('rank', 'Rank is required').notEmpty()
];

const transferValidation = [
  check('personnelId', 'Personnel ID is required').notEmpty(),
  check('toBranch', 'Destination branch is required').notEmpty(),
  check('reason', 'Reason is required').notEmpty(),
  check('effectiveDate', 'Effective date is required').notEmpty()
];

module.exports = {
  validate,
  loginValidation,
  registerValidation,
  fileValidation,
  branchValidation,
  personnelValidation,
  transferValidation
};