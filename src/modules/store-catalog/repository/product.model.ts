import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "../../checkout/repository/order.model";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class CatalogProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  salesPrice: number;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  order_id: string;

  @BelongsTo(() => OrderModel)
  order: OrderModel;
}
