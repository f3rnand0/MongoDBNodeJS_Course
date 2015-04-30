var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/photosharing', function(err, db) {
    if(err) throw err;

    var query = {};
	var projection = {'_id':1};

    var cursor = db.collection('images').find(query, projection);
	
	cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

        console.dir("Doc: " + doc._id);

        return db.close();
    });
});
