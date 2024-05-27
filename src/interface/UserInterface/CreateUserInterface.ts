import LoginInputInterface from "../securityInterface/LoginInputInterface";
import UserInputInterface from "./UserInputInterface";

interface CreateUserInterface {
    user: UserInputInterface;
    credential: LoginInputInterface;
}

export default CreateUserInterface