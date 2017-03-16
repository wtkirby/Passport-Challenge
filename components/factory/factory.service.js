var FactoryModel = require('./factory.model');

// Returns all factories sorted by creation date
module.exports.getFactories = (req, res, next) => {
  FactoryModel.getFactories((err, factories) => {
    if (err) {
      res.status('500').json({ 'message': 'Could not get factories'});
    } else {
      res.json(factories);
    }
  });
}

// Returns factory with given id
module.exports.getFactoryById = (req, res, next) => {
  FactoryModel.getFactoryById(req.params.id, (err, factory) => {
    if (err) {
      res.status('500').json({ 'message': 'Could not find factory with given Id' });
    } else {
      res.json(factory);
    }
  });
}

// Adds factory to database
module.exports.addFactory = (req, res, next) => {
  var upperBound = +req.body.upperBound;
  var lowerBound = +req.body.lowerBound;
  var name = req.body.name;

  if(Number.isInteger(lowerBound + upperBound) && lowerBound < upperBound && name.length > 0){
    FactoryModel.addFactory(req.body, (err, factory) => {
      if (err) {
        res.status('500').json({ 'message': 'Could not add factory'});
      } else {
        res.status('201').json(factory);
      }
    });
  }
  else{
    res.status('400').json({'message': 'Upper and lower bounds must be integers with the lower being strictly less than the upper'});
  }
}

// Updates factory with given id
module.exports.updateFactory = (req, res, next) => {
  var upperBound = +req.body.upperBound;
  var lowerBound = +req.body.lowerBound;
  var name = req.body.name;

  if(Number.isInteger(lowerBound + upperBound) && lowerBound < upperBound && name.length > 0){
    FactoryModel.updateFactory(req.params.id, req.body, (err, factory) => {
      if (err) {
        res.status('500').json({ 'message': 'Could not update factory'});
      } else {
        res.json(factory);
      }
    });
  }
  else{
    res.status('400').json({'message': 'Upper and lower bounds must be integers with the lower being strictly less than the upper'});
  }
}

// Deletes factory with given id
module.exports.deleteFactory = (req, res, next) => {
  FactoryModel.deleteFactory(req.params.id, (err, factory) => {
    if (err) {
      res.status('500').json({ 'message': 'Could not delete factory'});
    } else {
      res.json(factory);
    }
  })
}

// Generates children for factory with given id and given amount in request body
module.exports.generateChildren = (req, res, next) => {
  var amountToGen = req.body.amount;
  if (req.body.amount > 15 || req.body.amount < 1) {
    res.status('400').json({ 'message': 'Range accepted 1 to 15'});
  } else {
    FactoryModel.getFactoryById(req.params.id, (err, factory) => {
      if (err) {
        res.status('500').json({ 'message': 'Could not find factory with given Id'});
      } else {
        var lowerBound = factory.lowerBound;
        var upperBound = factory.upperBound;
        var newChildren = [];

        for (i = 0; i < amountToGen; ++i) {
          newChildren.push(Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound);
        }

        FactoryModel.addChildrenToFactory(req.params.id, newChildren, (err, factoryWithChildren) => {
          if (err) {
            res.json({ 'message': 'Could not generate children'});
          } else {
            res.status('202').json(factoryWithChildren);
          }
        });
      }
    });
  }
}
