var controller = require('./clients.controller');

module.exports = function(app) {
  app.get('/clients', controller.getClients);
  app.post('/clients', controller.createClient;
  app.delete('/clients/:id', controller.removeClient);
  app.get('/clients/:id', controller.getClient);
  app.put('/clients/:id', controller.updateClient);
};
