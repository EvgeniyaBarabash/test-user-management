const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models");
const ctrl = require("../../controllers/users");

router.get("/", ctrlWrapper(ctrl.getAllUsers));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.delete("/", ctrlWrapper(ctrl.removeAll));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

module.exports = router;
