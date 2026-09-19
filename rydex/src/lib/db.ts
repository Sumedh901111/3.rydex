import mongoose from "mongoose"

const mongodbUrl = process.env.MONGODB_URL

if (!mongodbUrl) {
    throw new Error("MONGODB_URL is not configured")
}

const mongoHost = (() => {
    try {
        return new URL(mongodbUrl).hostname
    } catch {
        return "invalid MongoDB URL"
    }
})()

let cached = global.mongooseConn
if (!cached) {
    cached = global.mongooseConn = { conn: null, promise: null }
}

const connectDb = async () => {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongodbUrl, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
        }).then(c => c.connection)
    }

    try {
        const conn = await cached.promise
        return conn
    } catch (error) {
        cached.promise = null
        const message = error instanceof Error ? error.message : "unknown connection error"
        console.error(`[mongodb] connection failed for ${mongoHost}: ${message}`)
        throw error
    }

}

export default connectDb