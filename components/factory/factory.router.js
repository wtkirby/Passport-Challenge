var express = require('express');
var router = express.Router();
var FactoryService = require('./factory.service');

router.get('/', FactoryService.getFactories);

router.get('/:id', FactoryService.getFactoryById);

router.post('/', FactoryService.addFactory);

router.post('/:id/generateChildren', FactoryService.generateChildren);

router.put('/:id', FactoryService.updateFactory);

router.delete('/:id', FactoryService.deleteFactory);

module.exports = router;