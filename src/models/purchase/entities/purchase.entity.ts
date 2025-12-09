import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Address } from "src/models/address/entities/address.entity";
import { PromoUsage } from "src/models/promo/entities/promo-usage.entity";
import { ShipmentMethod } from "src/models/shipment-method/entities/shipment-method.entity";
import { User } from "src/models/users/entities/user.entity";

@Table({ tableName: "purchase" })
export class Purchase extends Model {

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  user_id: number;

  @ForeignKey(() => Address)
  @Column({ allowNull: false, type: DataType.INTEGER })
  address_id: number;

  @ForeignKey(() => ShipmentMethod)
  @Column({ allowNull: false, type: DataType.INTEGER })
  shipmentMethod_id: number;

  @ForeignKey(() => PromoUsage)
  @Column({ allowNull: true, type: DataType.INTEGER })
  promo_id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  card_number: string;

  @Column({ allowNull: false, type: DataType.JSON })
  product_ids: { id: number; count: number }[];

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Address)
  address: Address;

  @BelongsTo(() => ShipmentMethod)
  shipmentMethod: ShipmentMethod;

  @BelongsTo(() => PromoUsage)
  promoUsage: PromoUsage;
}
