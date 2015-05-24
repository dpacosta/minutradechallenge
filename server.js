	var express = require('express');
	var app =  express();
	var mongojs = require('mongojs');
	var db = mongojs('clientlist', ['clientlist']);
	var bodyParser = require('body-parser');

	app.use(express.static(__dirname + "/public"));
	app.use(bodyParser.json());

	app.get('/clientlist', function(req,res){
		db.clientlist.find(function(err, docs){
			res.json(docs);
		});

	});

	app.post('/clientlist', function(req,res){
		db.clientlist.insert(req.body, function(err, doc){
			res.json(doc);
		})
	});

	app.delete('/clientlist/:id', function(req,res){
		var id = req.params.id;
		db.clientlist.remove({_id : mongojs.ObjectId(id)}, function(err,doc){
			res.json(doc);
		})
	});

	app.get('/clientlist/:id', function(req,res){
		var id = req.params.id;
		db.clientlist.findOne({_id : mongojs.ObjectId(id)}, function(err,doc){
			res.json(doc);
		})
	});

	app.put('/clientlist/:id', function(req,res){
		var id = req.params.id;
		db.clientlist.findAndModify({
			query: {
				id: mongojs.ObjectId(id)
			},
			update: {
				$set: {
					name: req.body.name,
					cpf: req.body.cpf,
					email: req.body.email,
					address: req.body.address,
					phone: req.body.phone,
					maritalstatus:
					req.body.maritalstatus}
				},
			new: true
		},function(err,doc){
				res.json(doc);
			});
	});

	app.listen(3000);