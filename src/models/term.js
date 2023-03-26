const { Schema } = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const termSchema = new Schema({
    "subject": { type: String, required: true, },
    "number": Number,
    "user_id": { type: Schema.Types.ObjectId, required: true, }

}, { timestamps: true })


termSchema.plugin(mongoose_delete);


module.exports = { collectionName : 'Term' , Schema : termSchema };