import { DataTypes } from 'sequelize'

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    uploadUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
}

export default function (sequelize) {
    const UserUpload = sequelize.define('UserUpload', SCHEMA)

    UserUpload.associate = function ({ User }) {
        UserUpload.belongsTo(User, { foreignKey: 'userId' })
    }

    return UserUpload
}
