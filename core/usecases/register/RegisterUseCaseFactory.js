import UserRepository from "../../../data/repositories/UserRepository";
import db from "../../../data/models";
import AuthService from "../../service/AuthService";
import RegisterUseCase from './RegisterUseCase';

export default class RegisterUseCaseFactory {
    static make() {
        const userRepository = new UserRepository(db);
        const authService = new AuthService();
        return new RegisterUseCase(userRepository, authService);
    }
}