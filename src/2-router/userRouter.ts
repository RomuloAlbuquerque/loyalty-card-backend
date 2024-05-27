import express from "express";
import userController from "../3-controller/userController";

const local = express();

const userRouter = () => {
  return (
    local.post("/authenticate", userController.authenticate),
    local.post("/readAllUsers", userController.readAllUsers),
    local.get("/readUserById/:id", userController.readUserById),
    local.post("/createUser", userController.createUser),
    // local.put("/updateUserById/:id", userController.updateUser),
    local.delete("/removeUserById/:id", userController.removeUser)
  );
};

export default userRouter;