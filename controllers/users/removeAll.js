const { User } = require("../../models");

const removeAll = async (req, res) => {
    const result = await User.deleteMany();
    res.json({
        status: "success",
        code: 200,
        data: {
            result,
        },
    });
};
module.exports = removeAll;
