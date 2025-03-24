const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O titulo e obrigatorio.")
      .isString()
      .withMessage("O titulo e obrigatorio.")
      .isLength({ min: 3 })
      .withMessage("O titulo precisa de ter no minimo 3 characteres"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem e obrigatoria.");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
  ];
};

const commentValidation = () => {
  return [
    body("comment").isString().withMessage("O comentario e obrigatorio!"),
  ];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
