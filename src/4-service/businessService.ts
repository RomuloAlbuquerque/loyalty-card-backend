import businessDAO from "../5-dao/businessDAO";
import ResultInterface from "../interface/ResultInterface";
import BusinessInputInterface from "../interface/businessInterface/BusinessInputInterface";
import RelAdminInput from "../interface/businessInterface/RelAdminInputInterface";
import RelClientInput from "../interface/businessInterface/RelClientInputInterface";

const businessService = {

    readBusinessById: async (id: string): Promise<ResultInterface> => 
        await businessDAO.readBusinessById(id),

    createBusiness: async (business: BusinessInputInterface): Promise<ResultInterface> =>
        await businessDAO.createBusiness(business),

    createRelAdminBusiness: async (relAdmin: RelAdminInput): Promise<ResultInterface> =>
        await businessDAO.createAdmin(relAdmin),

    createRelClientBusiness: async (relClient: RelClientInput): Promise<ResultInterface> =>
        await businessDAO.createClient(relClient),

    readAllAdminWithBusiness: async (): Promise<ResultInterface> =>
        await businessDAO.readAllAdminWithBusiness(),



}

export default businessService