import moment from 'moment';
import { decode } from 'jwt-simple';
import { TOKEN_SECRET } from '../../shared/Values';

const NO_AUTH_URLS = [
    '/api/v1/auth/login',
    '/api/v1/auth',
    '/api/v1/auth/signOut',
    '/api/v1/auth/refresh-token',
    '/api/v1/register'
];

export const ensureAuthenticated = function (req, res, next) {
    if (!NO_AUTH_URLS.includes(req.originalUrl)) {
        if (!req.headers.authorization) {
            return res
                .status(403)
                .send({message: "Tu petición no tiene cabecera de autorización"});
        }

        let token = req.headers.authorization.split(" ")[1];
        let payload = decode(token, TOKEN_SECRET);

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

        req.user = payload.sub;
    }
    next();
}