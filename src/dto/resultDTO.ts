import ResultInterface from "../interface/ResultInterface";
import { message } from "../message/message";

class Result {
  auth : boolean;
  serviceMessage: string;
  dataResponse?: any;
  constructor(auth: boolean, dataResponse?: any){
    this.auth = auth;
    this.serviceMessage = this.auth ? message.success : message.notFound;
    this.dataResponse = dataResponse;
  }
  setAuth(newAuth:boolean): void{
    this.auth = newAuth;
    this.serviceMessage = this.auth ? message.success : message.notFound;
  }
  setMessage(msg:string): void{
    this.serviceMessage = msg
  }
  setAll(newResult: ResultInterface):void {
    this.auth = newResult.auth;
    this.serviceMessage = this.auth ? message.success : message.notFound
    this.dataResponse = newResult.dataResponse
  }
}

const resultDTO = (auth: boolean, dataResponse?: any) => {
  // let serviceMessage = auth ? message.success : message.notFound;
  let result : ResultInterface = new Result(auth, dataResponse)
  // dataResponse
  //   ? { auth: auth, serviceMessage: serviceMessage, dataResponse: dataResponse }
  //   : { auth: auth, serviceMessage: serviceMessage };
  
  return result;
}


export default resultDTO