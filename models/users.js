const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
});

const User = model("datum", userSchema);

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number().positive().required(),
});

module.exports = {
    User,
    joiSchema,
};
