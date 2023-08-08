import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import SubscriptionPerk from "@/database/models/subscription_perk";
import Subscription_Perk from "@/database/models/subscription_perk";

const initSubscription = (sequelize, Types) => {
	class Subscription extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Subscription.hasMany(Subscription_Perk, {
				foreignKey: 'subscriptionId',
				as: 'subscriptionPerks',
			});
		}
	}
	Subscription.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			title: DataTypes.STRING,
			slug: DataTypes.STRING,
			price: DataTypes.FLOAT,
			image: DataTypes.STRING,
			duration: DataTypes.STRING,
			instructor: DataTypes.STRING,
			type: DataTypes.STRING,
			access_time: DataTypes.STRING,
			// perks: DataTypes.JSON,
			background: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "Subscription",
			tableName: "subscriptions",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);


	// sequelize
	//     .sync()
	//     .then(() => console.log("sinc"))
	//     .catch((err) => console.log(err));

	return Subscription;
};

export default initSubscription(connection, DataTypes);
