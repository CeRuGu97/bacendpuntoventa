import UseCase from '../../base/UseCase';

class LoginUseCase extends UseCase {
    constructor(userRepository, authService, tokenRepository) {
        super();
        this.userRepository = userRepository;
        this.authService = authService;
        this.tokenRepository = tokenRepository;
    }

    async execute(params) {
        try {
            const user = await this.userRepository.login(params.email, params.password);
            if (!user) {
                throw new Error('login invalid credentials');
            }

            const token = this.authService.createToken(user);
            const tokenRefresh = this.authService.createRefreshToken(user);
            if(user){
                await this.tokenRepository.AddNewToken(tokenRefresh);
            }
            return {
                user: {
                    id: user.id,
                    name: user.username,
                    email: user.email
                },
                token,
                tokenRefresh
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default LoginUseCase;