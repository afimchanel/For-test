const mongoose = require("mongoose");
const path = require("path");
const glob = require("glob")
const mongoose_delete = require('mongoose-delete');

var export_batabase = {}

export_batabase.sync = async function () {
    const MONGOURI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authMechanism=SCRAM-SHA-1&authSource=admin`;
    const dir_models = path.join(__dirname, '..', 'models');
    // const mongo_db = await mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology:true,family: 4, }, (err, db) => {
    //     if(err) return  console.log('err',err);
    //     console.log('DB is connected ');
    //     return db;
    // });
    const mongo_db = await new Promise(async (resolve, reject) => {
        mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, family: 4, }, (err, db) => {
            if (err) return reject(err)
            console.log('DB is connected');
            resolve(db)
        });

    })

    export_batabase['mongo_db'] = mongo_db

    mongoose.plugin(mongoose_delete, { deletedAt: true });
    const models = glob.sync(`${dir_models}/*.js`.replace(/\\/g, '/'))
    for (const require_model of models) {
        const model = require(require_model)
        export_batabase[model.collectionName] = mongoose.model(model.collectionName, model.Schema)
    }
}


module.exports = export_batabase;