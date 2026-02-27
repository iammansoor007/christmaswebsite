// models/Content.js
import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    version: {
        type: Number,
        default: 1,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
}, {
    timestamps: true,
});

// Delete existing model if it exists to prevent overwrite error
export default mongoose.models.Content || mongoose.model('Content', ContentSchema);