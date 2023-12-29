import moment from 'moment';
import { encode } from 'jwt-simple';
import { REFRESH_TOKEN, TOKEN_SECRET } from '../../shared/Values';

export default class AuthService {
    createToken(user) {
        let payload = {
            sub: user.id,
            iat: moment().unix(),
            exp: moment().add(1, "days").unix(),
        };
        return encode(payload, TOKEN_SECRET);
    }

    createRefreshToken(user) {
        let payload = {
            sub: user.id,
            iat: moment().unix(),
            exp: moment().add(15, "days").unix(),
        };
        return encode(payload, REFRESH_TOKEN);
    }
}