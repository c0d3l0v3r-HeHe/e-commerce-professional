import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = Schema({
    videoFile: {
        type: String,
        required: true,
    },
    ThumbNail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
// For writing the aggregate queries on MongoDB we use the Aggregation Framework
// mongoose-aggregate-paginate-v2
videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video");
