import mongoose from 'mongoose'
import logger from '@/utilities/logger'
import config from './config'
export function connectDB() {
    const mongoSRV =
        config.MONGO_URI ||
        `mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_IP_ADDRESS}:${config.MONGO_PORT}?authSource=admin`

    mongoose
        .connect(mongoSRV)
        .then(() => {
            logger.info('Successfully connected to MongoDB')
        })
        .catch((err) => {
            logger.info(`MongoDB Connection Failed: ${err.message}`)
        })
}
