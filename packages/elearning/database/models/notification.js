import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

const initNotification = (sequelize, Types) => {
    class Notification extends Model {
        static associate(models) {
            // define association here
        }
    }

    Notification.init(
        {
            id: {
                type: Types.UUID,
                defaultValue: Types.UUIDV4,
                primaryKey: true,
            },
            title: Types.STRING,
            message: Types.STRING,
            read: {
                type: Types.BOOLEAN,
                defaultValue: false,
            },
            link: Types.STRING,
            notificationType: {
                type: DataTypes.ENUM,
                values: ['LiveStream', 'Other'],
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                    as: 'userId',
                },
            },
            icon: Types.STRING, // Nueva columna para el ícono
        },
        {
            sequelize,
            modelName: 'Notification',
            tableName: 'notifications',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    return Notification;
};

export default initNotification(connection, DataTypes);
