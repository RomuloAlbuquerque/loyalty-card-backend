import client from "../6-db/db";
import LoginOutputInterface from "../interface/securityInterface/LoginOutputInterface";
import UserOutputInterface from "../interface/UserInterface/UserOutputInterface";
import UserInputInterface from "../interface/UserInterface/UserInputInterface";
import LoginInputInterface from "../interface/securityInterface/LoginInputInterface";
import ResultInterface from "../interface/ResultInterface";
import resultDTO from "../dto/resultDTO";
import CreateUserInterface from "../interface/UserInterface/CreateUserInterface";

const userDAO = {

  readAllCredentials: async (): Promise<ResultInterface> => {
    const result: ResultInterface = await client.query(`select * from public.credential`)
      .then(res => resultDTO(true, res.rows)).catch(e => resultDTO(false, e.message))
    return result
  },

  readAllUsers: async (): Promise<UserOutputInterface[]> =>
    (
      await client.query(
        `select * from public.user`
      )
    ).rows,

  readUserById: async (id: string): Promise<UserOutputInterface> => {
    const user: UserOutputInterface = (
      await client.query(
        `select name from public.user where id_user = $1`,
        [id]
      )
    ).rows[0];
    return user;
  },

  readEmail: async (email: string): Promise<ResultInterface> =>
    await client.query(`select * from public.credential where email = $1 AND $1 ~* '.*@.*'`,
      [email])
      .then(res => resultDTO(res.rowCount == 0 ? false : true, res.rows[0])).catch(e => resultDTO(false, e.message)),


  createUserAndCredential: async (createUser: CreateUserInterface): Promise<ResultInterface> => {
    const result = await client.query(`insert into public.user (name, cpf, born, whatsapp) values ($1, $2, $3, $4) returning *`,
      [createUser.user.name, createUser.user.cpf, createUser.user.born, createUser.user.whatsapp])
      .then(res => resultDTO(true, res.rows[0])).catch(e => resultDTO(false, e.message));

      result.auth &&
    await client.query(`insert into public.credential (email, password, id_user) values ($1, $2, $3) returning *`,
      [createUser.credential.email, createUser.credential.password, result.dataResponse.id_user])
      .catch(async e => {
        await client.query(`delete from public.user where id_user = ${result.dataResponse.id_user}`)
        result.setAll(resultDTO(false, e.message))
      })
    return result
  },

  
  createCredential: async (credential: LoginInputInterface): Promise<ResultInterface> =>
    await client.query(
      `insert into public.credential (email, password, id_user) values ($1, $2, $3)`,
      [credential.email, credential.password, credential.id_user]
    ).then(res => resultDTO(true, res.rows)).catch(e => resultDTO(false, e.message)),

  // updateUser: async (id: string, user: UserInputInterface): Promise<ResultInterface> =>
  //   await client.query(`update public.user set name = $1 where cpf = $2`, [
  //     user.name,
  //     id,
  //   ]),

  deleteUser: (id: string) =>
    client.query(`delete from public.user where cpf = $1`, [id])

};





export default userDAO;
