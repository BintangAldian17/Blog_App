import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Post from "./Post.js";

const { DataTypes } = Sequelize

const Category = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
}, {
    freezeTableName: true
})

Category.hasMany(Post, { foreignKey: 'category_name', onDelete: 'CASCADE', onUpdate: "CASCADE" })
Post.belongsTo(Category, { foreignKey: 'category_name' })

export default Category