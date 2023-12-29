import { METHOD_POST } from "../../shared/Methods";
import Controller from "../base/Controller";
import RegisterUseCaseFactory from "../usecases/register/RegisterUseCaseFactory";

class RegisterUserController extends Controller {
    static make(router) {
        const registerUserUseCase = RegisterUseCaseFactory.make();
        return new RegisterUserController(
            router,
            registerUserUseCase
        );
    }

    constructor(
        router,
        registerUserUseCase
    ) {
        super(router);
        let self = this;
        this.routesMap = [
            { endpoint: '', handler: function (req, res) { self.register(req, res) }, method: METHOD_POST },
        ];
        this.registerUserUseCase = registerUserUseCase;
    }

    async register(req, res){
        let params = req.body;
        try {
            let response = await this.registerUserUseCase.execute(params);
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

export default RegisterUserController;