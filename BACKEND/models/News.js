
const { Schema, models, model } = require('mongoose');

const NewsSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: [{ type: String }],
    newscategory: [{ type: String }],
    tags: [{ type: String }],
    status: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true, 
});

export const News = models.News || model('News', NewsSchema, 'news');