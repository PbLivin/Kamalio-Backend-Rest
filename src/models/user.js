import { DataTypes } from 'sequelize'
import jwt from 'jsonwebtoken'

export const TOKEN_TYPES = {
    ACCESS_TOKEN: 'access-token',
    REFRESH_TOKEN: 'refresh-token'
}

const PLATFORM_TYPES = {
    ANDROID: 'android',
    IOS: 'ios'
}

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    deviceId: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    platform: {
        type: DataTypes.ENUM(Object.values(PLATFORM_TYPES)),
        required: true,
        allowNull: false
    }
}

export default function(sequelize) {
    const User = sequelize.define('User', SCHEMA);

    User.TOKEN_TYPES = TOKEN_TYPES

    User.getAuthToken = (deviceId, salt) => jwt.sign({ deviceId }, salt)

    User.prototype.issueAuthToken = function (salt, authConfig) {
        return {
            accessToken: this.issueToken(
                TOKEN_TYPES.ACCESS_TOKEN,
                salt,
                authConfig.accessTokenLifetime
            ),
            refreshToken: this.issueToken(
                TOKEN_TYPES.REFRESH_TOKEN,
                salt,
                authConfig.refreshTokenLifetime
            ),
            expiresIn: authConfig.accessTokenLifetime,
        }
    }

    User.prototype.issueToken = function (type, salt, expiresIn) {
        return jwt.sign({
            id: this.id,
            type: type,
        }, salt, { expiresIn })
    }

    User.findOrCreate = async (deviceId, platform) => {
        const user = await User.find({ where: { deviceId }})
        if (user) {
            return user
        }
        const newUser = await User.create({ deviceId, platform })
        return newUser
    }

    return User
}
