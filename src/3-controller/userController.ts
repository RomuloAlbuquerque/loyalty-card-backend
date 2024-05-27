import userService from "../4-service/userService";
import { Request, Response } from "express";

const userController = {
  authenticate : async (req: Request, res: Response) : Promise<Response> => res.json(await userService.authenticate(req.body)),
  readAllUsers: async (req: Request, res: Response) : Promise<Response> => res.json(await userService.readAllUsers(req.body)),
  readUserById: async (req: Request, res: Response) : Promise<Response> => res.json(await userService.readUserById(req.params.id)),
  createUser: async (req: Request, res: Response) : Promise<Response> => res.json(await userService.createUser(req.body)),
  // updateUser: async (req: Request, res: Response) : Promise<Response> => res.json(await userService.updateUser(req.params.id, req.body)),
  removeUser: async (req: Request, res: Response) : Promise<Response> => res.json(await userService.removeUser(req.params.id)),
}

export default userController;