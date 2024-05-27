import express from "express";
import businessController from "../3-controller/businessController";

const local = express();

const businessRouter = () => {
  return (
    local.get("/readBusinessById/:id", businessController.readBusinessById),
    local.post("/createBusiness", businessController.createBusiness),
    local.post("/createRelAdminBusiness", businessController.createRelAdminBusiness),
    local.get("/createRelClientBusiness", businessController.createRelClientBusiness),
    local.get("/readAllAdminWithBusiness", businessController.readAllAdminWithBusiness)
  );
};

export default businessRouter;