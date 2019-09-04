import Joi from '@hapi/joi';

/**
 * User's validation schema
 */
const userSchema = Joi.object().keys({
    id: Joi.number().required(),
    firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).min(3).max(20).required(),
	lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).min(3).max(20).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(3).max(100).required(),
	address: Joi.string().min(3).required(),
	bio: Joi.string().regex(/^[a-zA-Z ]{3,30}$/).min(5).max(30).required(),
	occupation: Joi.string().regex(/^[a-zA-Z ]{3,30}$/).min(3).max(30).required(),
	expertise: Joi.string().regex(/^[a-zA-Z ]{3,30}$/).min(3).max(30).required(),
	avatar: Joi.string().required(),
	role_id:  Joi.number().required(),
	token: [Joi.string(), Joi.number().required()]
});

export default userSchema;