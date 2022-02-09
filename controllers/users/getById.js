const { NotFound } = require("http-errors");
const { User } = require("../../models");

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) {
        throw new NotFound(`User with id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result,
        },
    });
};
module.exports = getById;
