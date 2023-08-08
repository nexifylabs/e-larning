import {Model, DataTypes} from "sequelize";
import connection from "../connection";

const initHotmartUser = (sequelize, Types) => {
    class HotmartUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        // 	// define association here
        // }
    }

    HotmartUser.init(
        {
            id: {
                type: Types.UUID,
                defaultValue: Types.UUIDV4,
                primaryKey: true,
            },
            name: Types.STRING,
            email: Types.STRING,
            password: Types.STRING,
            email_confirmed: Types.BOOLEAN,
            email_confirmed_at: Types.DATE,
        },
        {
            sequelize,
            modelName: "HotmartUser",
            tableName: "hotmart_users",
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    return HotmartUser
};


export default initHotmartUser(connection, DataTypes);