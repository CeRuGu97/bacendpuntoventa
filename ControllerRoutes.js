import AuthController from './core/controllers/AuthController';
import RegisterUserController from './core/controllers/RegisterUserController';
import UserController from './core/controllers/UserController';

const CONTROLLER_ROUTES = [
    { endpoint: 'auth', controller: AuthController },
    { endpoint: 'register', controller: RegisterUserController },
    { endpoint: 'user', controller: UserController }
]

export default CONTROLLER_ROUTES;