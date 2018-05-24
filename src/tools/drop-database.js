import generateConfig from '../config'
import initSequelizeFromConfig from '../database'

async function drop() {
    const config = generateConfig()
    const { sequelize } = initSequelizeFromConfig(config)
    await sequelize.drop({ force: true })
    sequelize.close()
}

drop().catch(err => console.log(err))
