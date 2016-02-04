var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/photosharing', function(err, db) {
    if(err) throw err;

    var imagesData = db.collection('images');
	var albumsData = db.collection('albums');
    //var options = { 'sort' : [['State', 1], ['Temperature', -1]] };// , 'limit' : 10};
    //var cursor = data.find({}, {'State' : 1, 'Temperature' : 1}, options);
	var cursor = imagesData.find( {}, {'_id':1} );

	var counterDocs = 0;
	var counterFinds = 0;
	var counterRemoves = 0;
	var newImageId = '';
	var actualImageId = '';
	var cursorClosed = false;
	
    cursor.each(function(err, doc1) {
        if(err) throw err;
        if(doc1 == null) {
			cursorClosed = true;
			return;
		}
		
		function findImageInsideAlbum (imageId, err) {
			if(err) throw err;
			var findQuery = {'images':imageId};
			albumsData.findOne(findQuery, function(err, doc) {
				if(err) throw err;
				if(doc == null) {
					var removeQuery = {'_id':imageId};
					imagesData.remove(removeQuery, function(err, removed) {
						if(err) throw err;
						console.dir("Successfully removed " + removed + " documents!")
						--counterRemoves;
						//++counterRemoves;
					});
					++counterRemoves;
					//console.dir("Images removed: " + counterRemoves);
				}
				--counterFinds;
				++counterDocs;
				console.dir("Images: " + counterDocs);
				if (cursorClosed && counterFinds == 0 && counterRemoves == 0) {
					return db.close();
				}
			});
		}
		
		newImageId = doc1._id;
		if (newImageId != actualImageId) {
			++counterFinds;
			findImageInsideAlbum(newImageId, err);
		}
		actualImageId = newImageId;
		
    });
	
	console.dir("Images: " + counterFinds);
	
});
