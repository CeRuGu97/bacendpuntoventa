import UseCase from "../../base/UseCase";

class SignOutUseCase extends UseCase{
    constructor(userRepository){
        super();
        this.userRepository = userRepository
    }

    async execute(req, res){
        try {
            let token = req.headers.authorization.split(" ")[1];
            const found = await this.userRepository.signOut(token);
            if(!found) {
                throw new Error("Unauthorized");
            }
            return {message: "singOut"};
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
export default SignOutUseCase;