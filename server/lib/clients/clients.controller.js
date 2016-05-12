var service = require('./clients.service');

var ClientsController = function () {
  this.getClients = function (req, res) {
    service.getClients(req, function (err, clients) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(clients).end();
    });
  };

  this.createClient = function (req, res) {
    service.createClient(req, function (err, client) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(client).end();
    });
  };

  this.removeClient = function (req, res) {
    service.removeClient(req, function (err, client) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(client).end();
    });
  };

  this.getClient = function (req, res) {
    var cpf = req.query.cpf;
    if(cpf){
      service.getClientByCPF(cpf, function (err, client) {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(client).end();
      });
      service.getClient(req, function (err, client) {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(client).end();
      });
    };

    this.updateClient = function (req, res) {
      service.getClient(req, function (err, client) {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(client).end();
      });
    };

    return this;

  }

  module.exports = new ClientsController();
