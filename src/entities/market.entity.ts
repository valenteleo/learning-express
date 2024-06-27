import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "market" })
export class Market {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("nvarchar")
  product_name: string;

  @Column("float")
  product_value: number;

  @Column("nvarchar")
  buyer: string;

  @Column("bit")
  settled: boolean;
}