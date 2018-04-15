import { DataTypes } from 'sequelize'

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    allowNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    const UserNotificationSettings = sequelize.define('UserNotificationSettings', SCHEMA);

    UserNotificationSettings.associate = function ({ User }) {
        UserNotificationSettings.belongsTo(User, { foreignKey: 'userId' })
    }
    
    return UserNotificationSettings
}
