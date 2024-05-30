import ResultInterface from "../interface/ResultInterface";
import { message } from "../message/message";

class Result {
  auth: boolean;
  serviceMessage: string;
  dataResponse?: any;
  constructor(auth: boolean, dataResponse?: any) {
    this.auth = auth;
    this.serviceMessage = this.auth ? message.success : message.notFound;
    this.dataResponse = dataResponse;
  }
  setAuth(newAuth: boolean): void {
    this.auth = newAuth;
    this.serviceMessage = this.auth ? message.success : message.notFound;
  }
  setMessage(msg: string): void {
    this.serviceMessage = msg
  }
  setDataResponse(obj: any): void {
    this.dataResponse = obj
    !obj && this.setAuth(false)
  }
  setAll(newResult: ResultInterface): void {
    this.setAuth(newResult.auth);
    this.serviceMessage = this.auth ? message.success : message.notFound
    this.dataResponse = newResult.dataResponse
  }
}

const resultDTO = (auth: boolean, dataResponse?: any) => {
  let result: ResultInterface = new Result(auth, dataResponse)
  return result;
}


export default resultDTO