import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cloudinary from 'cloudinary'
import router from './routes'
import generateConfig from './config'
import initSequelize from './database'

process.on('unhandledRejection', console.error)

const config = generateConfig()
const { sequelize, models } = initSequelize()

cloudinary.config({
    cloud_name: config.cloud.name,
    api_key: config.cloud.apiKey,
    api_secret: config.cloud.apiSecret,
})

const depedencies = { sequelize, models, cloudinary }

const app = initApp(config, depedencies)

app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}!`)
})

export default function initApp(config, depedencies) {
    const app = express()

    app.set('config', config)
    app.set('models', depedencies.models)
    app.set('sequelize', depedencies.sequelize)
    app.set('cloudinary', depedencies.cloudinary)

    app.use(morgan('dev'))

    app.use(cors({ origin: true }))

    app.use(bodyParser.urlencoded({ limit: '12mb',
        extended: false,
        parameterLimit: 1000000 }))
    app.use(bodyParser.json({ limit: '12mb' }))

    app.use(router)

    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            statusCode: err.status || 500,
            error: err.name,
            message: err.message,
        })
    })
    app.use((req, res) => {
        res.status(404).json({
            statusCode: 404,
            error: 'Not Found',
            message: 'No such route',
        })
    })

    return app;
}
