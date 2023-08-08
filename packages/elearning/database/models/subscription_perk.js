// subscription_perks.js (modelo para la tabla 'subscription_perks')
import connection from "@/database/connection";
import {DataTypes, Model} from "sequelize";
import Subscription from "@/database/models/subscription";

const initSubscription_Perk = (sequelize, Types) => {
    class Subscription_Perk extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Subscription_Perk.belongsTo(Subscription, {
                foreignKey: 'subscriptionId',
                as: 'subscription',
            });
        }
    }
    Subscription_Perk.init(
        {
            id: {
                type: Types.UUID,
                defaultValue: Types.UUIDV4, // Genera un UUID automáticamente
                primaryKey: true,
            },
            subscriptionId: {
                type: DataTypes.UUID, // Utiliza UUID para la clave foránea
                allowNull: false,
                // onDelete: "CASCADE",
                references: {
                    model: 'subscriptions',
                    key: 'id',
                    as: 'subscriptionId'
                },
            },
            text: {
                type:DataTypes.STRING,
                allowNull: false
            },
            value: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },

        },
        {
            sequelize,
            modelName: "Subscription_Perk",
            tableName: "subscription_perks",
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    // sequelize
    //     .sync()
    //     .then(() => console.log("sinc"))
    //     .catch((err) => console.log(err));

    return Subscription_Perk;
};
export default initSubscription_Perk(connection, DataTypes);


