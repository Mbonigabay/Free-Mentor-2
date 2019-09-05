import Joi from '@hapi/joi';

/**
 * session's validation schema
 */
const sessionSchema = Joi.object().keys({
    sessionId: Joi.number().required(),
    mentorId: Joi.number().required(),
	menteeId: Joi.number().required(),
	question: Joi.string().regex(/^[a-zA-Z ]{3,30}$/).min(5).max(30).required(),
	menteeEmail: Joi.string().email().required(),
	status: Joi.string().required()
});

export default sessionSchema;