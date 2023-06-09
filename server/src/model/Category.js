import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Post from "./Post.js";

const { DataTypes } = Sequelize

const Category = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true
})

Category.hasMany(Post, { foreignKey: 'categoryId', onDelete: 'CASCADE', onUpdate: "CASCADE" })
Post.belongsTo(Category, { foreignKey: 'categoryId' })

export default Category