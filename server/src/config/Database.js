import { Sequelize } from "sequelize"

const db = new Sequelize('blog_app', 'root', '@murdi254313', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db