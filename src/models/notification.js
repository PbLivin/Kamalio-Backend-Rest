import { DataTypes } from 'sequelize'

export const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING(511),
        allowNull: false,
        validate: {
            len: [2, 512],
        },
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    isUnread: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}

export default function (sequelize) {
    const Notification = sequelize.define('Notification', SCHEMA)

    Notification.associate = function ({ User }) {
        Notification.belongsTo(User, { foreignKey: 'userId' })
    }

    return Notification
}
