import client from "../6-db/db";
import resultDTO from "../dto/resultDTO";
import ResultInterface from "../interface/ResultInterface";
import BusinessInputInterface from "../interface/businessInterface/BusinessInputInterface";
import RelAdminInput from "../interface/businessInterface/RelAdminInputInterface";
import RelClientInput from "../interface/businessInterface/RelClientInputInterface";

const businessDAO = {

  readBusinessById: async (id: string): Promise<ResultInterface> => 
      await client.query(`select name from public.business where id_business = $1`,
        [id]).then(res => resultDTO(res.rowCount ? true : false, res.rows[0])).catch(e => resultDTO(false, e.message)),

  createBusiness: async (business: BusinessInputInterface): Promise<ResultInterface> =>
    await client.query(`insert into public.business (name, cnpj, email, address, site) values ($1, $2, $3, $4, $5) returning *`,
      [business.name, business.cnpj, business.email, business.address, business.site])
      .then(res => resultDTO(true, res.rows[0])).catch(e => resultDTO(false, e.message)),

  createAdmin: async (relAdmin: RelAdminInput): Promise<ResultInterface> =>
    await client.query(`insert into public.admin (id_user, id_business) values ($1, $2) returning *`,
      [relAdmin.id_user, relAdmin.id_business]).then(res => resultDTO(true, res.rows[0])).catch(e => resultDTO(false, e.message)),

  createClient: async (relClient: RelClientInput): Promise<ResultInterface> =>
    await client.query(`insert into public.client (id_user, id_business) values ($1, $2) returning *`,
      [relClient.id_user, relClient.id_business]).then(res => resultDTO(true, res.rows[0])).catch(e => resultDTO(false, e.message)),

  readAllAdminWithBusiness: async ():Promise<ResultInterface> =>
    await client.query(
      `select u.*, u.name as user_name, b.name as business_name, b.* 
              from public.user u inner 
              join public.admin a on u.id_user = a.id_user 
              join public.business b on a.id_business = b.id_business`
    ).then(res => resultDTO(true, res.rows)).catch(e => resultDTO(false, e.message))
}

export default businessDAO