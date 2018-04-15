import generateConfig from '../config'
import initSequelizeFromConfig from '../database'

drop().catch(err => console.log(err))

async function drop() {
    const config = generateConfig()
    const { sequelize } = initSequelizeFromConfig(config)
    await sequelize.drop({ force: true })
    sequelize.close()
}
