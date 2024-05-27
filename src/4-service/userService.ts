import userDAO from "../5-dao/userDAO";
import LoginInputInterface from "../interface/securityInterface/LoginInputInterface";
import LoginOutputInterface from "../interface/securityInterface/LoginOutputInterface";
import ResultInterface from "../interface/ResultInterface";
import UserInputInterface from "../interface/UserInterface/UserInputInterface";
import UserOutputInterface from "../interface/UserInterface/UserOutputInterface";
import Token from "../interface/securityInterface/TokenInterface";
import userSecurity from "../security/userSecurity";
import resultDTO from "../dto/resultDTO";
import CreateUserInterface from "../interface/UserInterface/createUserInterface";

const userService = {
  authenticate: async (attempt: LoginInputInterface): Promise<ResultInterface> => {
    const list: LoginOutputInterface[] = await userDAO.readAllCredentials();
    const credential: LoginOutputInterface = list.filter(
      (credential) => attempt.email == credential.email
    )[0];
    const auth: boolean = await userSecurity.compareEncryption(
      attempt.password,
      credential.password
    );
    return resultDTO(auth, userSecurity.authenticate(await userDAO.readUserById(credential.id_user)))
  },

  readAllUsers: async (token: Token): Promise<ResultInterface> => {
    const res: ResultInterface = userSecurity.authorize(token.token)
    let result: ResultInterface = resultDTO(res.auth);
    result.auth ? result.dataResponse = await userDAO.readAllUsers() : result.dataResponse = res.dataResponse
    return result;
  },

  createUser: async (createUser: CreateUserInterface): Promise<ResultInterface> => {

    let result: ResultInterface = resultDTO(false)
    let resultCredential: ResultInterface

    !createUser.credential.email || !createUser.credential.password || !createUser.credential.email.toString().includes(`@`)
      ? result.dataResponse = 'E-mail or password invalid'
      : (result.setAll(await userDAO.readEmail(createUser.credential.email)),

        !result.auth
          ? result.setMessage("e-mail already exists")
          : ((result.setAll(await userSecurity.encrypt(createUser.credential.password)),

            result.auth
            && (createUser.credential.password = result.dataResponse,
              result.setAll(await userDAO.createUser(createUser.user))),

            result.auth
            && (createUser.credential.id_user = result.dataResponse.id_user),
            resultCredential = await userDAO.createCredential(createUser.credential)

          )))
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
