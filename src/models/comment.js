import { DataTypes } from 'sequelize'

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
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
    commentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Comments',
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}

export default function (sequelize) {
    const Comment = sequelize.define('Comment', SCHEMA)

    Comment.associate = function ({ User, Post, Comment: _Comment}) {
        Comment.belongsTo(User, { foreignKey: 'userId' })
        Comment.belongsTo(Post, { foreignKey: 'postId' })
        Comment.belongsTo(_Comment, { foreignKey: 'commentId' })
    }

    return Comment
}
