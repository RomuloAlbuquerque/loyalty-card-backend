import businessService from "../../4-service/businessService"
import userService from "../../4-service/userService"
import businessInputDTO from "../../dto/businessDTO/businessInputDTO"
import { relAdminInputDTO } from "../../dto/businessDTO/relAdminInputDTO"
import resultDTO from "../../dto/resultDTO"
import { loginInputDTO } from "../../dto/security/loginInputDTO"
import { userInputDTO } from "../../dto/userDTO/userInputDTO"
import ResultInterface from "../../interface/ResultInterface"
import UserInputInterface from "../../interface/UserInterface/UserInputInterface"
import UserOutputInterface from "../../interface/UserInterface/UserOutputInterface"
import BusinessOutputInterface from "../../interface/businessInterface/BusinessOutputInterface"
import LoginInputInterface from "../../interface/securityInterface/LoginInputInterface"


let id_user
let id_admin
let id_business
let id_client
let email_user
let userCreated
let business
let token


const testBusiness = () => {


    // create user
    const createUser = async (name: string, email: string, password: string) => {
        const result: ResultInterface = await userService.createUser(userInputDTO(name), loginInputDTO(email, password))
        userCreated = result.dataResponse
        console.log('>>>>>>>', userCreated)
    }
    // fazer login
    const login = async (email: string, password: string) => {
        const result = await userService.authenticate(loginInputDTO(email, password))
        token = result.dataResponse
        console.log(result)
    }
    // cadastrar business
    const createBusiness = async (name: string, cnpj: string, email: string, address: string, site: string) => {
        const result = await businessService.createBusiness(businessInputDTO(name, cnpj, email, address, site))
        console.log(result)
        return result
    }
    // cadastrar admin
    // const createRelAdmin = async (userName:string) => {
    //     console.log(business.id_business)
    //     const resultUser = await userService.createUser(userInputDTO(userName),  loginInputDTO('marcos@email.com', 'pattern'))
    //     const newUser:UserOutputInterface = resultUser.dataResponse
    //     const relAdmin = await businessService.createRelAdminBusiness(relAdminInputDTO(newUser.id_user, business.id_business))
    //     console.log('created ',{newUser, relAdmin})
    // }


    // find business by admin





    // cadastrar




    // createUser('Albuquerque', 'albuquerque@email.com', '123')
    // login('albuquerque@email.com', '123')
    // business = createBusiness('Minha Empresa', '12230989876586', 'empresa@email.com', '', '')
    // createRelAdmin('Marcos')

    const teste = () => {
        let result = resultDTO(false)
        result.setAuth(true)
        return result
    }




}

export default testBusiness