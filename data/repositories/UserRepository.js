import sha1 from 'sha1';

class UserRepository {
    constructor(db){
        this.db = db;
    }

    async login(email, password){
        try {
            const hashPassword = sha1(password);
            return await this.db.users.findOne({
                where: {
                    email,
                    password: hashPassword
                }
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUser(idUser){
        try {
            return await this.db.users.findOne({
                where: {
                    id: idUser
                }
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async registerUser(params) {
        try {
            return await this.db.users.create(params);
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new Error(error.errors[0].message);
            }
            throw new Error(error);
        }
    }

    async signOut(token){
        try {
            return await this.db.Token.destroy({ where:{ name: token }})
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default UserRepository;