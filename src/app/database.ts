import mongoose from 'mongoose';

const database = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Reused existing database connection!");
      return;
    }

    const database = process.env.DATABASE as string;
    const databasePassword = process.env.DATABASE_PASSWORD as string;
    const dbUri = database.replace('<password>', encodeURIComponent(databasePassword));

    mongoose.set('strictQuery', true);

    await mongoose.connect(dbUri);

    const development = process.env.NODE_ENV === "development";
    if (development) console.log("DB connection successful!");
  } catch (err) {
    console.error("Could not connect to database", err);
  }
};

export default database;
