var mongojs = require('mongojs');
var db = mongojs('clientlist', ['clientlist']);

var ClientsService = function () {

  this.getClients = function(req, callback){
    db.clientlist.find(function(err, clients){
      if(err){
        return callback({
          msg: err,
          status: 500
        });
      }
      callback(err, clients);
    });
  });

  this.createClient = function(req, callback){
    db.clientlist.insert(req.body, function(err, client){
      if(err){
        return callback({
          msg: err,
          status: 500
        });
      }
      callback(err, client);
    })
  });

  this.removeClient =  function(req, callback){
    var id = req.params.id;
    db.clientlist.remove({_id : mongojs.ObjectId(id)}, function(err,client){
      if(err){
        return callback({
          msg: err,
          status: 500
        });
      }
      callback(err, client);
    })
  });

  this.getClient = function(req, callback){
    var id = req.params.id;
    db.clientlist.findOne({_id : mongojs.ObjectId(id)}, function(err, client){
      if(err){
        return callback({
          msg: err,
          status: 500
        });
      }
      callback(err, client);
    })
  });

  this.updateClient = function(req, callback){
    var id = req.params.id;
    db.clientlist.findAndModify({
      query: {
        _id: mongojs.ObjectId(id)
      },
      update: {
        $set: {
          name: req.body.name,
          cpf: req.body.cpf,
          email: req.body.email,
          address: req.body.address,
          phones: req.body.phones,
          maritalstatus:
          req.body.maritalstatus}
        },
        new: true
      },function(err, client){
        if(err){
          return callback({
            msg: err,
            status: 500
          });
        }
        callback(err, client);
      });
    });

    this.getClientByCPF function(cpf, callback){
      db.clientlist.findOne({cpf : cpf}, function(err,client){
        if(err){
          return callback({
            msg: err,
            status: 500
          });
        }
        callback(err, client);
      })
    });

    return this;

  }

  module.exports = new ClientsService();
