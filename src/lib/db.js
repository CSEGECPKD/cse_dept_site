import mongoose from 'mongoose';
import dns from 'dns';

try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToMongo(uri) {
    const opts = {
        bufferCommands: false,
        dbName: 'cse_website',
    };
    return await mongoose.connect(uri, opts);
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
        cached.promise = (async () => {
            try {
                return await connectToMongo(MONGODB_URI);
            } catch (err) {
                // If SRV DNS query fails on Windows/ISP, fallback to direct replica set hosts
                if (
                    err.message &&
                    (err.message.includes('querySrv') ||
                        err.message.includes('ECONNREFUSED') ||
                        err.message.includes('ENOTFOUND')) &&
                    MONGODB_URI.includes('mongodb+srv://')
                ) {
                    console.log(
                        'SRV resolution failed, attempting direct replica set connection fallback...'
                    );
                    try {
                        const url = new URL(
                            MONGODB_URI.replace('mongodb+srv://', 'http://')
                        );
                        const auth =
                            url.username && url.password
                                ? `${encodeURIComponent(url.username)}:${encodeURIComponent(url.password)}@`
                                : '';
                        const directUri = `mongodb://${auth}ac-b3hjwis-shard-00-00.n6u037s.mongodb.net:27017,ac-b3hjwis-shard-00-01.n6u037s.mongodb.net:27017,ac-b3hjwis-shard-00-02.n6u037s.mongodb.net:27017/cse_website?ssl=true&replicaSet=atlas-wq2z09-shard-0&authSource=admin`;
                        return await connectToMongo(directUri);
                    } catch (fallbackErr) {
                        console.error(
                            'Direct fallback connection failed:',
                            fallbackErr.message
                        );
                        throw err;
                    }
                }
                throw err;
            }
        })();
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('dbConnect error:', e.message);
    }

    return cached.conn;
}

export default dbConnect;
