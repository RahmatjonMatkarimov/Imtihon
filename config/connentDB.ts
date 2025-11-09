import { Sequelize } from 'sequelize'
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    password: process.env.DB_PASS || "admin",
    database: process.env.DB_NAME || "crm",
    username: "postgres",
    logging: false
})

sequelize.authenticate().then(() => console.log("connent to db")).catch((err: any) => console.error(err))

sequelize.sync({ force: false })

export default sequelize