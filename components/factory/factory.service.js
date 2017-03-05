var FactoryModel = require('./factory.model');

module.exports.getFactories = (req, res, next) => {
    FactoryModel.getFactories((err, factories) => {
        if (err) {
            res.status('500').send('Could not get factories.');
        } else {
            res.json(factories);
        }
    });
}

module.exports.getFactoryById = (req,res,next) => {
    FactoryModel.getFactoryById(req.params.id, (err, factory) =>{
        if(err){
            res.status('500').send('Could not find factory with given Id.');
        }
        else{
            res.json(factory);
        }
    });
}

module.exports.addFactory = (req, res, next) => {
    FactoryModel.addFactory(req.body, (err, factory) => {
        if (err) {
            res.status('500').send('Could not add factory.');
        } else {
            res.send('Factory added.');
        }
    });
}

module.exports.updateFactory = (req, res, next) => {
    FactoryModel.updateFactory(req.params.id, req.body, (err, factory) => {
        if (err) {
            res.status('500').send('Could not update factory');
        } else {
            res.send('Factory updated.');
        }
    });
}

module.exports.deleteFactory = (req, res, next) => {
    FactoryModel.deleteFactory(req.params.id, (err, factory) => {
        if (err) {
            res.status('500').send('Could not delete factory.');
        } else {
            res.send('Factory deleted.')
        }
    })
}

module.exports.generateChildren = (req, res, next) => {
    var amountToGen = req.body.amount;
    if (req.body.amount > 15) {
        res.send('Limit 15');
    } else {
        FactoryModel.getFactoryById(req.params.id, (err, factory) => {
            if (err) {
                res.send('Could not find factory with given Id.');
            } else {
                var lowerBound = factory.lowerBound;
                var upperBound = factory.upperBound;
                var newChildren = [];

                for (i = 0; i < amountToGen; ++i) {
                    newChildren.push(Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound);
                }

                FactoryModel.addChildrenToFactory(req.params.id, newChildren, (err, factory) => {
                    if (err) {
                        res.send('Could not generate children.');
                    } else {
                        res.send('Children generated.');
                    }
                });

            }
        });
    }
}