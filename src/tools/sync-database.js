import generateConfig from '../config'
import initSequelizeFromConfig from '../database'

async function sync() {
    const config = generateConfig()
    const { sequelize } = initSequelizeFromConfig(config)
    await sequelize.sync({ force: true })
    sequelize.close()
}

sync().catch(err => console.log(err))
