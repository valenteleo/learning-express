import "reflect-metadata";
import { DataSource } from "typeorm";
import { Market } from "../entities/market.entity";

const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  password: "1176790",
  username: "sa",
  port: 1433,
  database: "test",
  synchronize: true,
  entities: [Market],
  options: {
    trustServerCertificate: true,
    encrypt: true
  }
})

export default AppDataSource;