'user strict'

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        id: {
            primaryKey : true,
            allowNull: null,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false
    }
    );

    return Users;
}