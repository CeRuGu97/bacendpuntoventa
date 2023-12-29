import UserRepository from '../../../data/repositories/UserRepository';
import LoginUseCase from './LoginUseCase';
import db from '../../../data/models';
import AuthService from '../../service/AuthService';
import TokenRepository from '../../../data/repositories/TokenRepository';

export default class LoginUseCaseFactory {
    static make() {
        const userRepository = new UserRepository(db);
        const authService = new AuthService();
        const tokenRepository = new TokenRepository(db);
        return new LoginUseCase(userRepository, authService, tokenRepository);
    }
}