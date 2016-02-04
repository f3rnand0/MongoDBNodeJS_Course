use blog;
db.grades.aggregate([ {"$unwind":"$scores"}, {"$match":{ $or: [{"scores.type":"homework"},{"scores.type":"exam"}]}}, {"$group": {_id:{student_id:"$student_id",class_id:"$class_id"},stAvg:{$avg:"$scores.score"}}}, {"$group": {_id:"$_id.class_id",clAvg:{$avg:"$stAvg"}}}, {$sort:{clAvg:-1}} ])