import { Pool, QueryResult } from "pg";

export type DB = Pool;
export type QueryResultWithDB = QueryResult & { db: DB };
