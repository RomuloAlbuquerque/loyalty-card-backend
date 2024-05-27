import { QueryResult } from "pg";
import { types } from "pg";
import client from "../6-db/db";
import LoginOutputInterface from "../interface/securityInterface/LoginOutputInterface";
import UserOutputInterface from "../interface/UserInterface/UserOutputInterface";
import UserInputInterface from "../interface/UserInterface/UserInputInterface";
import LoginInputInterface from "../interface/securityInterface/LoginInputInterface";
import ResultInterface from "../interface/ResultInterface";
import resultDTO from "../dto/resultDTO";
import { userOutputDTO } from "../dto/userDTO/userOutputDTO";
import { loginOutputDTO } from "../dto/security/loginOutputDTO";

const userDAO = {

  readAllCredentials: async (): Promise<LoginOutputInterface[]> => {
    const result: LoginOutputInterface[] = (await client.query(`select * from public.credential`)).rows
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
      .then(res => resultDTO(res.rowCount == 0 ? true : false)).catch(e => resultDTO(false, e.message)),

  createUser: async (user: UserInputInterface): Promise<ResultInterface> =>
    await client.query(
      `insert into public.user (name, cpf, born, whatsapp) values ($1, $2, $3, $4) returning *`,
      [user.name, user.cpf, user.born, user.whatsapp]
    ).then(res => resultDTO(true, res.rows[0])).catch(e => resultDTO(false, e.message)),

  createCredential: async (credential: LoginInputInterface): Promise<ResultInterface> =>
    await client.query(
      `insert into public.credential (email, password, id_user) values ($1, $2, $3)`,
      [credential.email, credential.password, credential.id_user]
    ).then(res => resultDTO(true, res.rows[0])).catch(e => resultDTO(false, e.message)),

  // updateUser: async (id: string, user: UserInputInterface): Promise<ResultInterface> =>
  //   await client.query(`update public.user set name = $1 where cpf = $2`, [
  //     user.name,
  //     id,
  //   ]),

  deleteUser: (id: string) =>
    client.query(`delete from public.user where cpf = $1`, [id])

};





export default userDAO;
