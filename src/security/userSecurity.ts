import jwt, { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
import ResultInterface from "../interface/ResultInterface";
import UserInputInterface from "../interface/UserInterface/UserInputInterface";
import resultDTO from "../dto/resultDTO";

const key: any = process.env.SECRET;

const userSecurity = {
  authenticate: (user: UserInputInterface): string => {
    const token: string = jwt.sign(user, key, { expiresIn: "1h" });
    return token;
  },

  authorize: (token: string): ResultInterface => {
    let result : ResultInterface = resultDTO(false)
    jwt.verify(token, key, (err: any, decoded: any) =>
      err ? result = resultDTO(false, err.message) : result = resultDTO(true, decoded)
    )
    return result
  }
  ,

  encrypt: async (pass: any): Promise<ResultInterface> =>
    await bcrypt.hash(pass, 1).then((hash) => resultDTO(true, hash)).catch(e => resultDTO(false, e.message)),

  compareEncryption: async (attempt: string, hash: string): Promise<boolean> =>
    await bcrypt.compare(attempt, hash),
};

export default userSecurity;
