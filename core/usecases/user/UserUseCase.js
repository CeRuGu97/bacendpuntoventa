import { decode } from 'jwt-simple';
import { TOKEN_SECRET } from '../../../shared/Values';
import UseCase from '../../base/UseCase';

class UserUseCase extends UseCase {
    constructor(userRepository){
        super();
        this.userRepository = userRepository;
    }

    async execute(req) {
        let token = req.headers.authorization.split(" ")[1];
        let payload = decode(token, TOKEN_SECRET);
        const user = await this.userRepository.getUser(payload.sub);
        return {
            user: {
                id: user.id,
                name: user.username,
                email: user.email
            },
        }
    }
}

export default UserUseCase;