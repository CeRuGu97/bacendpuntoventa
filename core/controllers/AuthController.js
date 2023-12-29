import { METHOD_DELETE, METHOD_POST } from "../../shared/Methods";
import LoginUseCaseFactory from "../usecases/auth/LoginUseCaseFactory";
import RefreshTokenUseCaseFactory from "../usecases/refreshToken/RefreshTokenUseCaseFactory";
import SignOutUseCaseFactory from "../usecases/signOut/SignOutUseCaseFactory";
import Controller from "../base/Controller";

class AuthController extends Controller {
    static make(router){
        const loginUseCase = LoginUseCaseFactory.make();
        const refreshTokenUseCase = RefreshTokenUseCaseFactory.make();
        const signOutUseCase = SignOutUseCaseFactory.make();
        return new AuthController(
            router,
            loginUseCase,
            refreshTokenUseCase,
            signOutUseCase
        )
    }

    constructor(
        router,
        loginUseCase,
        refreshTokenUseCase,
        signOutUseCase
    ){
        super(router);
        const self = this;
        this.routesMap = [
            { endpoint: '', handler: (req, res) => { self.login(req, res) }, method: METHOD_POST },
            { endpoint: '/refresh-token', handler: (req, res) => { self.refreshToken(req, res) }, method: METHOD_POST },
            { endpoint: '/signOut', handler: (req, res) => { self.signOut(req, res) }, method: METHOD_DELETE },
        ];
        this.loginUseCase = loginUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.signOutUseCase = signOutUseCase;
    }

    async login(req, res) {
        const params = req.body;
        try {
            const response = await this.loginUseCase.execute(params);
            res.contentType("application/json");
            res.status(200);
            res.send({result: 'ok', response});
        } catch (error) {
            res.contentType("application/json");
            res.status(400);
            res.send({ result: "error", message: error.message });
        }
    }

    async refreshToken(req, res) {
        try {
            const response = await this.refreshTokenUseCase.execute(req, res);
            res.contentType("application/json");
            res.status(200);
            res.send({result: 'ok', response});
        } catch (error) {
            res.contentType("application/json");
            res.status(400);
            res.send({ result: "error", message: error.message });
        }
    }

    async signOut(req, res) {
        try {
            const response = await this.signOutUseCase.execute(req, res);
            res.contentType("application/json");
            res.status(200);
            res.send({result: 'ok', response});
        } catch (error) {
            res.contentType("application/json");
            res.status(400);
            res.send({ result: "error", message: error.message });
        }
    }
}

export default AuthController;