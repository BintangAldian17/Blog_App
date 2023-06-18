import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";
import Post from "./Post.js";

const { DataTypes } = Sequelize

const BookMark = db.define('bookmark', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    freezeTableName: true
})

User.hasMany(BookMark, { foreignKey: "userId", onDelete: "CASCADE" })
Post.hasMany(BookMark, { foreignKey: "userId", onDelete: "CASCADE" })
BookMark.belongsTo(User)
BookMark.belongsTo(Post)

export default BookMark