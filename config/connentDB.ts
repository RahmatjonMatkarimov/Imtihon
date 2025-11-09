import { Sequelize } from 'sequelize'
const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    username: "postgres",
    logging: false
})

sequelize.authenticate().then(() => console.log("connent to db")).catch((err: any) => console.error(err))

sequelize.sync({ force: false })

export default sequelize