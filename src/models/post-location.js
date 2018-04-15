import { DataTypes } from 'sequelize'

export const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        required: true,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DOUBLE,
        required: true,
        allowNull: false,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Posts',
            key: 'id',
        },
    },
}

export default function (sequelize) {
    const PostLocation = sequelize.define('PostLocation', SCHEMA)

    PostLocation.associate = function ({ Post }) {
        PostLocation.belongsTo(Post, { foreignKey: 'postId' })
    }

    return PostLocation
}
