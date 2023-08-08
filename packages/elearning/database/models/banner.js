import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initBanner = (sequelize, Types) => {

    class Banner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Banner.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            code: DataTypes.STRING,
            discount: DataTypes.FLOAT,
            exp_date: DataTypes.DATE,
            isNavBar: DataTypes.BOOLEAN,
            deleted_at: DataTypes.DATE,
            active_for_full_site: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Banner",
            tableName: "banners",
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    // sequelize
    //     .sync()
    //     .then(() => console.log("sinc"))
    //     .catch((err) => console.log(err));

    return Banner;
};

export default initBanner(connection, DataTypes);