import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Post from "./Post.js";
import User from "./User.js";

const { DataTypes } = Sequelize

const Comment = db.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
})

Post.hasMany(Comment, { as: "comments", foreignKey: 'postId', onDelete: 'CASCADE' })
User.hasMany(Comment, { foreignKey: 'userId', onDelete: "CASCADE" })
Comment.belongsTo(User, { foreignKey: 'userId' })
Comment.belongsTo(Post, { as: "post", foreignKey: 'postId' })

export default Comment