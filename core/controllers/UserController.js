import { METHOD_GET } from "../../shared/Methods";
import Controller from "../base/Controller";
import UserUseCaseFactory from "../usecases/user/UserUseCaseFactory";

class UserController extends Controller {
    static make(router){
        const userUseCase = UserUseCaseFactory.make();
        return new UserController(
            router,
            userUseCase,
        )
    }

    constructor(
        router,
        userUseCase
    ){
        super(router);
        const self = this;
        this.routesMap = [
            {
                endpoint: '/getUser',
                handler: (req, res) => { self.getUser(req, res) },
                method: METHOD_GET
            }
        ];
        this.userUseCase = userUseCase;
    }

    async getUser(req, res) {
        try {
            const response = await this.userUseCase.execute(req);
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

export default UserController;