import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";

const { DataTypes } = Sequelize

const Post = db.define('post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    cover: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT,
    },
    heading: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" })
Post.belongsTo(User, { foreignKey: "userId" })


export default Post