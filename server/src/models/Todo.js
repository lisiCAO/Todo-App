module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ownerId: {
            type: DataTypes.STRING(320),
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        task: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: { len: [8, 100] }
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isDone : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isIn: [[0, 1]]
            }
        }
    }, {
        timestamps: false, 
    });

    Todo.associate = (models) => {
        Todo.belongsTo(models.User, { foreignKey: 'ownerId' });
    };
    
    return Todo;
};
