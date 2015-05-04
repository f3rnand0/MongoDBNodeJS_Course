var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/photosharing', function(err, db) {
    if(err) throw err;

    var imagesData = db.collection('images');
	var albumsData = db.collection('albums');
    //var options = { 'sort' : [['State', 1], ['Temperature', -1]] };// , 'limit' : 10};
    //var cursor = data.find({}, {'State' : 1, 'Temperature' : 1}, options);
	var cursor = imagesData.find( {}, {'_id':1} );

	var counterDocs = 0;
	var counterUpds = 0;
	var newState = '';
	var actualState = '';
	
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
			return;
		}
		
		var query = {'images':doc._id};
		var album = albumsData.find(query, function(err, doc) {
			if(err) throw err;
			console.dir("Album: " + album);
			if (typeof album != 'undefined') {
				console.dir("Image: " + doc._id + ", Album: " + album._id);
			}
			//console.dir(doc);
			//db.close();
		});

		/*function updateHighestStTemp (doc, err) {
			if(err) throw err;
			var query = doc;
			var operator = { '$set' : { 'month_high' : true } };
			data.update(query, operator, function(err, updated) {
				if(err) throw err;
				//console.dir("  counterUpds " + counterUpds);
				++counterUpds;
				if (counterUpds < 0 && counterUpds == counterDocs) {
					//console.dir("DB closed");
					db.close();
				}
			});
		}
	
		newState = doc.State;
		if (newState != actualState) {
			console.dir(doc);
			++counterDocs;
			updateHighestStTemp(doc, err);
		}
		actualState = newState;*/
    });
	
});
