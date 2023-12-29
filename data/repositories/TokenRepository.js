class TokenRepository {
    constructor(db){
        this.db = db;
    }

    async AddNewToken(token){
        try {
            const newToken = {
                name: token
            }
            return await this.db.Token.create(newToken)
        } catch (error) {
            throw new Error(error);
        }
    }

    async FindOneToken(token){
        try {
            return await this.db.Token.findOne({ where:{ name: token }})
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default TokenRepository;