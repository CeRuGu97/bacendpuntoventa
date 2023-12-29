import UseCase from '../../base/UseCase';
import { decode } from 'jwt-simple';
import { REFRESH_TOKEN } from '../../../shared/Values';
import moment from 'moment';

class RefreshTokenUseCase extends UseCase {
    constructor(tokenRepository, authService, userRepository) {
        super();
        this.tokenRepository = tokenRepository
        this.authService = authService
        this.userRepository = userRepository
    }

    async execute(req, res) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            const found = await this.tokenRepository.FindOneToken(token);
            if(!found) {
                throw new Error("Unauthorized");
            }

            let payload = decode(found.name, REFRESH_TOKEN);
            if (payload.exp <= moment().unix()) {
                return res
                    .status(401)
                    .send({ message: "El token ha expirado" })
            }
            if (payload.sub === null) {
                return res
                    .status(401)
                    .send({ message: "El token ha expirado" })
            }
            const userData = await this.userRepository.getUser(payload.sub);
            const accessToken = this.authService.createToken(userData);

            return {accessToken};
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default RefreshTokenUseCase;