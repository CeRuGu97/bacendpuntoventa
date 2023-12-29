import db from "../../../data/models";
import UserRepository from "../../../data/repositories/UserRepository";
import UserUseCase from "./UserUseCase";

export default class UserUseCaseFactory {
    static make() {
        const userRepository = new UserRepository(db);
        return new UserUseCase(userRepository);
    }
}