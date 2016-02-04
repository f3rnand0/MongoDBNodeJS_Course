var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

	//var options = { 'limit' : 10 ,'sort' : [["_id", 1]]};
	var options = { 'sort' : [["_id", 1]]};

    db.collection('students').find({}, {}, options).toArray(function(err, docs) {
        if(err) throw err;

        var res = {};

		var homeworkScores = [];
		for(var i = 0; i < docs.length; i++) {
			var id = docs[i]['_id'];
			var scores = docs[i]['scores'];
			
			var homeworkScoresDoc = [];
			for(var j = 0; j < scores.length; j++) {
				var type = (scores[j]['type']);

				if (type == 'homework') {
					//console.log("id : " + id + ", homework: " + type + ", score: " + scores[j]['score']);
					homeworkScoresDoc.push(scores[j]['score']);
				}
			}

			var lowest = Math.min.apply(null, homeworkScoresDoc);
			var index = homeworkScoresDoc.indexOf(lowest);
			if(index != -1) {
				homeworkScoresDoc = homeworkScoresDoc.splice(index, 1);
			}
			//console.log("scores-id: " + id + ", scoresH: " + homeworkScoresDoc.toString());
			homeworkScores.push.apply(homeworkScores, homeworkScoresDoc);
		}
		
		for(var i = 0; i < homeworkScores.length; i++) {
			console.log("downs: " + homeworkScores[i]);
		}
		
		var numCallbacks = 0;
		for(var i = 0; i < docs.length; i++) {
			var id = docs[i]['_id'];
		    db.collection('students').update({'_id' : id}, { '$pull' : { 'scores' : { 'score' : homeworkScores[i] } } }, function (err, updated) {
		        if(err) throw err;
		        console.log("Updated" + updated + " homework document");
		        if (++numCallbacks == docs.length) {
		            return db.close();
		        }
		    });
		}

		//console.log("downs: " + homeworkScores[i]);

    });
});
