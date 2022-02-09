const { NotFound } = require("http-errors");
const { User } = require("../../models");

const removeById = async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndRemove(id);
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
module.exports = removeById;
