const { NotFound } = require("http-errors");
const { User } = require("../../models");

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
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
module.exports = updateById;
