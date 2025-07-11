import { DataSource } from 'typeorm';
export declare const InMemoryDataSource: DataSource;
export declare const seedData: (dataSource: DataSource) => Promise<void>;
