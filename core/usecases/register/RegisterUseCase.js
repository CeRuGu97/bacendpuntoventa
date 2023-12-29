import UseCase from "../../base/UseCase";
import sha1 from "sha1";

class RegisterUseCase extends UseCase {
    constructor(userRepository, authService, tokenRepository){
        super();
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async execute(params){
        try {
            this.validateParams(params);
            const mappedParams = {
                email: params.email,
                password: sha1(params.password),
                username: params.name
            }
            const user = await this.userRepository.registerUser(mappedParams);
            return {user};
        } catch (error) {
            throw new Error(error.message);
        }
    }

    validateParams(params) {
        if (!params.name) {
            throw new Error("Added name");
        }
        if (!params.email) {
            throw new Error("Added email");
        }
        if (!params.password) {
            throw new Error("Added password");
        }
    }
}

export default RegisterUseCase;