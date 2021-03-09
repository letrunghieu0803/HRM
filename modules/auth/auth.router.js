const AuthRouter = require("express").Router();
const AuthController = require("./auth.controller");

AuthRouter.post("/", async (req, res) => {
  try {
    const { userName } = req.body;

    const user = await AuthController.createUser({
      userName,
    });
    res.send({ succsess: 1, data: user });

    return user;
  } catch (err) {
    console.log();
    res.send({ succsess: 0, message: err.message });
  }
});
AuthRouter.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = Number(page) ? Number(page) : 1;
    const limitNumber = Number(limit) ? Number(limit) : 8;

    const result = await AuthController.getUsers({
      page: pageNumber,
      limit: limitNumber,
    });
    res.send({ success: 1, data: result });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});
AuthRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await AuthController.getUser(id);
    res.send({ success: 1, data: foundUser });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

AuthRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, active } = req.body
    const updateUser = await AuthController.updateUser(id,userName, active);
    res.send({ success: 1, data: updateUser });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

module.exports = AuthRouter;
