import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        console.warn(
            'Warning: MONGODB_URI environment variable is not defined.'
        );
        return null;
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            dbName: 'cse_website',
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.log(e.message);
    }

    return cached.conn;
}

export default dbConnect;
