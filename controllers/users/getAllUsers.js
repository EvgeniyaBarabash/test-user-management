const { User } = require("../../models");

const getAllUsers = async (req, res) => {
    const data = await User.find({});
    res.json({
        status: "success",
        code: 200,
        data: {
            result: data,
        },
    });
};
module.exports = getAllUsers;
