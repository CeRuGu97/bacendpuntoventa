import RefreshTokenUseCase from "./RefreshTokenUseCase";
import TokenRepository from "../../../data/repositories/TokenRepository";
import db from "../../../data/models";
import AuthService from "../../service/AuthService";
import UserRepository from "../../../data/repositories/UserRepository";

export default class RefreshTokenUseCaseFactory {
    static make() {
        const tokenRepository = new TokenRepository(db);
        const authService = new AuthService();
        const userRepository = new UserRepository(db);
        return new RefreshTokenUseCase(tokenRepository, authService, userRepository);
    }
}