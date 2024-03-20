'use strict';
//var routeService = require('../service/routes');
//var message = require('../service/message');

exports = module.exports = function(app) {

    app.post('/api/test', function(req, res) {
        console.log('test post');
        console.log(req.body);
        res.send('test post');
    });
    app.get('/api/test/:id', function(req, res) {
        console.log('test get');
        console.log(req.params.id);
        res.send('test get');
    });
/*
  app.get('/api/message', routeService.apiEnsureAuthenticated,routeService.hasSysAdminAccess, message.find);
  app.get('/api/:orgpath/message', routeService.apiEnsureAuthenticated, routeService.hasAccessToOrganisation, message.find);
  app.get('/api/:orgpath/:cpath/message', routeService.apiEnsureAuthenticated, routeService.hasAccessToCompany, message.find);
  app.get('/api/:orgpath/:cpath/:dpath/message', routeService.apiEnsureAuthenticated, routeService.hasAccessToDepartment, message.find);

  app.post('/api/message', routeService.apiEnsureAuthenticated,routeService.hasSysAdminAccess, message.create);
  app.post('/api/:orgpath/message', routeService.apiEnsureAuthenticated,routeService.hasAccessToOrganisation, message.create);
  app.post('/api/:orgpath/:cpath/message', routeService.apiEnsureAuthenticated,routeService.hasAccessToCompany, message.create);
  app.post('/api/:orgpath/:cpath/:dpath/message', routeService.apiEnsureAuthenticated,routeService.hasAccessToDepartment, message.create);

  app.put('/api/message/:id', routeService.apiEnsureAuthenticated,routeService.hasSysAdminAccess, message.update);
  app.put('/api/:orgpath/message/:id', routeService.apiEnsureAuthenticated,routeService.hasAccessToOrganisation, message.update);
  app.put('/api/:orgpath/:cpath/message/:id', routeService.apiEnsureAuthenticated,routeService.hasAccessToCompany, message.update);
  app.put('/api/:orgpath/:cpath/:dpath/message/:id', routeService.apiEnsureAuthenticated,routeService.hasAccessToDepartment, message.update);

  app.delete('/api/message/:id', routeService.apiEnsureAuthenticated,routeService.hasSysAdminAccess, message.delete);
  app.delete('/api/:orgpath/message/:id', routeService.apiEnsureAuthenticated,routeService.hasAccessToOrganisation, message.delete);
  app.delete('/api/:orgpath/:cpath/message/:id', routeService.apiEnsureAuthenticated,routeService.hasAccessToCompany, message.delete);
  app.delete('/api/:orgpath/:cpath/:dpath/message/:id', routeService.apiEnsureAuthenticated,routeService.hasAccessToDepartment, message.delete);
*/
};
