import mongoose  from "mongoose";

const analyticsSchema = new mongoose.Schema({
    short_url: {
        type: String,
        required: true,
        index: true
    },
    browser: {
        type: String,
        default: null
    },
    os: {
        type: String,
        default: null
    },
    device: {
        type: String,
        default: null
    },
    referrer: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    ip: {
        type: String,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;