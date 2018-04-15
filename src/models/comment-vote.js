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
    commentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Comments',
            key: 'id',
        },
    },
}

export default function (sequelize) {
    const CommentVote = sequelize.define('CommentVote', SCHEMA)

    CommentVote.associate = function ({ User, Comment }) {
        CommentVote.belongsTo(User, { foreignKey: 'userId' })
        CommentVote.belongsTo(Comment, { foreignKey: 'commentId' })
    }

    return CommentVote
}
