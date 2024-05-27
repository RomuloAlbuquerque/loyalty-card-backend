import userService from "../../4-service/userService"
import { loginInputDTO } from "../../dto/security/loginInputDTO"
import tokenDTO from "../../dto/security/tokenDTO"


const testUser = async () => {
    return (
        // console.log(`testing userDAO...`),
        // console.log(`${userDAO.readAllUsers.name}`, await userDAO.readAllUsers() ? true : false),
        // console.log(`${userDAO.readAllAdminsWithBusiness.name}`, await userDAO.readAllAdminsWithBusiness() ? true : false),
        // console.log(`${userDAO.readAllCredentials.name}`, await userDAO.readAllCredentials() ? true : false),
        // console.log(`${userDAO.createUser.name}`, await userDAO.createUser(userDTO("teste")) ? true : false)
        // console.log(`${userDAO.createCredentials.name}`, await userDAO.createCredentials(loginDTO('teste@teste.com', 'teste', '39')) ? true : false)
        // console.log(`testing userService...`)
        // console.log(`${userService.createUser.name}`, await userService.createUser(userDTO('teste'), loginDTO('teste@email.com', '123'))),
        // console.log(`${userService.authenticate.name}`, await userService.authenticate(loginInputDTO('teste@email.com', '123')))
        // console.log(`${userService.readAllUsers.name}`, await userService.readAllUsers(tokenDTO('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGUiLCJpYXQiOjE3MTY2MjI1NjAsImV4cCI6MTcxNjYyNjE2MH0.w9G3K42tZk1nCJkqKElTGjXJzvOnyWsdNX4ltNa5X_4')))
        // console.log(`${userService.readAllUsers.name}`, await userService.readUserById('8'))
        console.log('...')
    )
}

export default testUser



