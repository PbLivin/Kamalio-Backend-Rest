import generateConfig from '../config'
import initSequelizeFromConfig from '../database'

seed().catch(err => console.log(err))

async function seed() {
    const config = generateConfig()
    const { sequelize, models } = initSequelizeFromConfig(config)

    // Application specific
    
    sequelize.close()
}
