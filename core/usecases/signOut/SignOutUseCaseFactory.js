import db from "../../../data/models";
import UserRepository from "../../../data/repositories/UserRepository";
import SignOutUseCase from "./SignOutUseCase";

export default class SignOutUseCaseFactory{
    static make() {
        const userRepository = new UserRepository(db);
        return new SignOutUseCase(userRepository)
    }
}