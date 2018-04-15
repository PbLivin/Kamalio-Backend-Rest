import { DataTypes } from 'sequelize'

const SCHEMA = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    karma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    const Karma = sequelize.define('Karma', SCHEMA);
    Karma.associate = function ({ User }) {
        Karma.belongsTo(User, { foreignKey: 'userId' })
    }
    return Karma
}
