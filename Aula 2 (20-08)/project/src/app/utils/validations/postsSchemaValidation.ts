import Joi from "joi";

const postsSchemaValidation = Joi.object({
  id: Joi.number().optional(),
  title: Joi.string().required().min(3).max(100).messages({
    "string.base": "O campo título deve ser uma string",
    "string.empty": "O campo título não pode estar vazio",
    "string.min": "O campo título deve ter pelo menos {#limit} caracteres",
    "string.max": "O campo título não pode ter mais de {#limit} caracteres",
    "any.required": "O campo título é obrigatório",
  }),
  content: Joi.string().required().min(3).max(255).messages({
    "string.base": "O campo conteúdo deve ser uma string",
    "string.empty": "O campo conteúdo não pode estar vazio",
    "string.min":
      "O campo conteúdo deve ter pelo menos {#limit} caracteres",
    "string.max":
      "O campo conteúdo não pode ter mais de {#limit} caracteres",
    "any.required": "O campo conteúdo é obrigatório",
  }),
  date_post: Joi.date().required().messages({
    "date.base": "O campo date_post deve ser uma data",
    "any.required": "O campo date_post é obrigatório",
  }),
  id_user: Joi.number().required().messages({
    "number.base": "O campo id_user deve ser um número",
    "number.empty": "O campo id_user não pode estar vazio",
  }),
});

export default postsSchemaValidation;