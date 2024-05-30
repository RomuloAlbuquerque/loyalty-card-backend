import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import userRouter from "../2-router/userRouter";
import businessRouter from "../2-router/businessRouter";

const app = express();

  const port = app.set("port", 3000).get("port");

  app.listen(port, () => console.log("Rodando na porta ", port));

  app.use(cors());

  app.use(function(req: Request, res: Response, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next(); 
  });

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json({ limit: "1mb" }));

  app.use(userRouter())
  app.use(businessRouter())

