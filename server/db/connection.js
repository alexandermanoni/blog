import pg from 'pg';
const { Pool } = pg;

// [note]: idk why this is a var and the rest aren't
const database = process.env.PGDATABASE;

// postgresql://user:pass@localhost:port/db
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;

// connection pool
const pool = new Pool({
  connectionString: connectionString,
});

export default {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};

/*
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("Blog");

export default db;
*/
