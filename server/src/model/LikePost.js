import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import User from "./User.js";
import Post from "./Post.js";

const { DataTypes } = Sequelize

const LikePost = db.define('like', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

}, {
    freezeTableName: true
})

User.hasMany(LikePost, { foreignKey: 'userId' })
Post.hasMany(LikePost, { foreignKey: 'postId' })
LikePost.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })
LikePost.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' })

export default LikePost