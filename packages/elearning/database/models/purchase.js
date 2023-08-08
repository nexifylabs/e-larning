import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initPurchase = (sequelize, Types) => {
    class Purchase extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        // 	// define association here
        // }
    }
    Purchase.init(
        {
            id: {
                type: Types.STRING,
                // defaultValue: Types.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: Types.STRING,
                allowNull: false,
            },
            amount: {
                type: Types.DECIMAL,
                allowNull: false
            },
            buyerEmail: {
                type: Types.STRING,
                allowNull: false
            },
            buyerName: {
                type: Types.STRING,
                allowNull: false
            },
            buyerDocType: {
                type: Types.STRING,
                allowNull: false
            },
            buyerDocNumber: {
                type: Types.STRING,
                allowNull: false
            },
            buyerAdressStreetNumber: {
                type: Types.STRING,
                allowNull: false
            },
            buyerPhoneNumber: {
                type: Types.STRING,
                allowNull: true
            },
            buyerAdressStreet: {
                type: Types.TEXT,
                allowNull: false
            },
            buyerAdressComplementary: {
                type: Types.TEXT,
                allowNull: true
            },
            buyerAdressNeighborhood: {
                type: Types.STRING,
                allowNull: false
            },
            buyerAdressCity: {
                type: Types.STRING,
                allowNull: false
            },
            buyerAdressState: {
                type: Types.STRING,
                allowNull: false
            },
            buyerAdressZipCode: {
                type: Types.STRING,
                allowNull: false
            },
            buyerCountry: {
                type: Types.STRING,
                allowNull: false
            },
            items: {
                type: Types.JSON,
                allowNull: false
            },

            paymentState: {
                type: Types.ENUM,
                values: ['SUCCESS', 'FAILED', 'PENDANT'],
                defaultValue: 'PENDANT',
                // allowNull: false,
            },
            paymentType: {
                type: Types.ENUM,
                values: ['get-net credito/debito', 'Manually added'],
                defaultValue: 'Manually added',
                // allowNull: false,
            },

        },
        {
            sequelize,
            modelName: "Purchase",
            tableName: "purchases",
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Purchase;
};

export default initPurchase(connection, DataTypes);
