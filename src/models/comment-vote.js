import { DataTypes } from 'sequelize'

const VALUES = {
    UPVOTE: 1,
    NOVOTE: 0,
    DOWNVOTE: -1
}

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    value: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        validate: {
            isPossibleValue(value) {
                if (!Object.values(VALUES).includes(value)) {
                    throw new Error('Not allowed value!')
                }
            }
        }
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

    CommentVote.associate = ({ User, Comment }) => {
        CommentVote.belongsTo(User, { foreignKey: 'userId' })
        CommentVote.belongsTo(Comment, { foreignKey: 'commentId' })
    }

    return CommentVote
}
