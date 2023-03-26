const { Schema } = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const meetingSchema = new Schema({
    "subject": { type: String, required: true, },
    "description": String,
    "startDate": { type: Date, required: true},
    "endDate": { type: Date, required: true},
    "terms": [{ type: Schema.Types.ObjectId, ref: 'Term' }],
    "user_id": { type: Schema.Types.ObjectId, required: true, }

}, { timestamps: true })


meetingSchema.plugin(mongoose_delete);


module.exports = { collectionName : 'Meeting' , Schema : meetingSchema };