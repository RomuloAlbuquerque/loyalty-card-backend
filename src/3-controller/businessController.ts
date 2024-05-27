import businessService from "../4-service/businessService";
import { Request, Response } from "express";

const businessController = {
  readBusinessById: async (req: Request, res: Response): Promise<Response> => res.json(await businessService.readBusinessById(req.params.id)),
  createBusiness: async (req: Request, res: Response): Promise<Response> => res.json(await businessService.createBusiness(req.body)),
  createRelAdminBusiness: async (req: Request, res: Response): Promise<Response> => res.json(await businessService.createRelAdminBusiness(req.body)),
  createRelClientBusiness: async (req: Request, res: Response): Promise<Response> => res.json(await businessService.createRelClientBusiness(req.body)),
  readAllAdminWithBusiness: async (req: Request, res: Response): Promise<Response> => res.json(await businessService.readAllAdminWithBusiness())
}

export default businessController;