var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PostSchema = new Schema(
{
    poster_id:
    {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    body:
    {
        type: String,
        required: false
    },
    board:
    {
        type: String,
        required: true
    },
    title:
    {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Post", PostSchema);
