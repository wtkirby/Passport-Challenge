var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var factorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lowerBound: {
        type: Number,
        required: true
    },
    upperBound: {
        type: Number,
        required: true
    },
    children: [Number]
});

var Factory = mongoose.model('Factory', factorySchema);

module.exports.getFactories = (callback) => {
    Factory.find({}, callback);
}

module.exports.getFactoryById = (factoryId, callback) => {
    Factory.findById(factoryId, callback);
}

module.exports.addFactory = (factory, callback) => {
    var newFactory = new Factory(factory);
    newFactory.save(callback);
}

module.exports.updateFactory = (factoryId, newData, callback) => {
    Factory.findByIdAndUpdate(factoryId, newData, {
        upsert: true
    }, callback);
}

module.exports.deleteFactory = (factoryId, callback) => {
    Factory.findByIdAndRemove(factoryId, callback)
}

module.exports.addChildrenToFactory = (factoryId, newChildren, callback) => {
    Factory.findByIdAndUpdate(factoryId, {
        children: newChildren
    }, {
        upsert: true
    }, callback);
}