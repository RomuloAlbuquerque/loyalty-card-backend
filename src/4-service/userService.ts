import userDAO from "../5-dao/userDAO";
import LoginInputInterface from "../interface/securityInterface/LoginInputInterface";
import ResultInterface from "../interface/ResultInterface";
import UserOutputInterface from "../interface/UserInterface/UserOutputInterface";
import Token from "../interface/securityInterface/TokenInterface";
import userSecurity from "../security/userSecurity";
import resultDTO from "../dto/resultDTO";
import CreateUserInterface from "../interface/UserInterface/CreateUserInterface";

const userService = {
  authenticate: async (attempt: LoginInputInterface): Promise<ResultInterface> => {

    let result: ResultInterface = await userDAO.readEmail(attempt.email);

    result.auth &&
      result.setAuth(await userSecurity.compareEncryption(
        attempt.password,
        result.dataResponse.password
      ).then(res => res.auth))

    result.auth
      ? result.setAll(userSecurity.authenticate(await userDAO.readUserById(result.dataResponse.id_user)))
      : result.setAll(resultDTO(false))

    return result
  },

  readAllUsers: async (token: Token): Promise<ResultInterface> => {
    const res: ResultInterface = userSecurity.authorize(token.token)
    let result: ResultInterface = resultDTO(res.auth);
    result.auth ? result.dataResponse = await userDAO.readAllUsers() : result.dataResponse = res.dataResponse
    return result;
  },

  createUser: async (createUser: CreateUserInterface): Promise<ResultInterface> => {

    let result: ResultInterface = resultDTO(false)

    !createUser.credential.password
      ? result.dataResponse = 'E-mail or password invalid'
      : (result.setAuth((!(await userDAO.readEmail(createUser.credential.email).catch(e => result.serviceMessage = e)).auth)),
        !result.auth && result.setDataResponse('E-mail already exist!'))

    result.auth &&
      (result.setAll(await userSecurity.encrypt(createUser.credential.password)
        .catch(e => result.serviceMessage = e)),
        createUser.credential.password = result.dataResponse)

    result.auth && result.setAll(await userDAO.createUserAndCredential(createUser).then(res => res)
      .catch(e => result.serviceMessage = e))

    return result
  },

  readUserById: async (id: string): Promise<ResultInterface> => {
    const user: UserOutputInterface = await userDAO.readUserById(id);
    const result: ResultInterface = user
      ? resultDTO(true, user)
      : resultDTO(false);
    return result;
  },

  // updateUser: async (id: string, user: UserInputInterface): Promise<boolean> =>
  //   (await userDAO.updateUser(id, user)).rowCount == 1 ? true : false,

  removeUser: async (id: string) => {
    const result = await userDAO.deleteUser(id);
    const msg = { serviceMessage: `${result.rowCount} users data deleted` };
    return msg;
  },
};

export default userService;
