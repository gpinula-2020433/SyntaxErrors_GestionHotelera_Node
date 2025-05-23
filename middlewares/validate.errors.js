import { validationResult } from "express-validator";

export const validateErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const allErrors = errors.array(); // todos los detalles
    const message = allErrors.map(err => ({ msg: err.msg })); // solo mensajes

    return res.status(400).send({
      errors: allErrors,
      message: message
    });
  }

  next();
};


