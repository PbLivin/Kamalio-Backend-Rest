import { DataTypes } from 'sequelize'

const VALUES = {
    'UPVOTE': 1,
    'DOWNVOTE': -1
}

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    value: {
        type: DataTypes.ENUM(Object.values(VALUES)),
        required: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
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
    const PostVote = sequelize.define('PostVote', SCHEMA)

    PostVote.associate = function ({ User, Post }) {
        PostVote.belongsTo(User, { foreignKey: 'userId' })
        PostVote.belongsTo(Post, { foreignKey: 'postId' })
    }

    return PostVote
}
