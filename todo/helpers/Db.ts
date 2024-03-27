import { MongoClient } from "mongodb";

const { DATABASE_URI } = process.env;

const client = new MongoClient(DATABASE_URI as string);

if (!DATABASE_URI) throw new Error("No Database URI Found.");

export const db = client.db();
export const User = db.collection('User');
export const Todos = db.collection('Todos');
