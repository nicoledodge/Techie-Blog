const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            allowNull: false,
            type: DataTypes.STRING
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        updatedAt: false,
        freezeTableName: true,
        modelName: 'comment'
    })

module.exports = Comment;