import generateConfig from '../config'
import initSequelizeFromConfig from '../database'

async function seed() {
    const config = generateConfig()
    const { sequelize, models } = initSequelizeFromConfig(config)

    // Application specific
    
    sequelize.close()
}

seed().catch(err => console.log(err))
