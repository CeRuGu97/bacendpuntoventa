import {
    METHOD_GET,
    METHOD_DELETE,
    METHOD_PATCH,
    METHOD_POST,
    METHOD_PUT,
} from "../../shared/Methods";

class Controller {
    constructor(router){
        this.router = router;
        this.routesMap = [];
    }

    applyRoutes() {
        this.routesMap.forEach(route => {
            switch (route.method) {
                case METHOD_GET:
                    this.router.route(route.endpoint).get(route.handler);
                    break;
                case METHOD_POST:
                    this.router.route(route.endpoint).post(route.handler);
                    break;
                case METHOD_PUT:
                    this.router.route(route.endpoint).put(route.handler);
                    break;
                case METHOD_DELETE:
                    this.router.route(route.endpoint).delete(route.handler);
                    break;
                default:
                    throw new Error("Not supported method")
            }
        });
        return this.router;
    }
}

export default Controller;