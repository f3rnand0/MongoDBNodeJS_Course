/*** QUESTION 1 ***/
use enron;
db.messages.aggregate([ { $match : {"headers.From":"andrew.fastow@enron.com"}}, {$unwind:"$headers.To"}, { $match : {"headers.To":"jeff.skilling@enron.com"}}, { $group: {_id:null,count:{$sum:1}}} ])

/*** QUESTION 2 ***/
db.messages.aggregate([ {$unwind:"$headers.To"}, {$group:{_id:{_id:"$_id",From:"$headers.From"}, receivers:{$addToSet:"$headers.To"}}}, {$unwind:"$receivers"}, { $group: {_id:{From:"$_id.From",To:"$receivers"},count:{$sum:1}}}, { $sort : {count:-1}} ])

db.messages.aggregate([ { $match : {"headers.From":"susan.mara@enron.com"}}, {$unwind:"$headers.To"}, {$group: {_id: '$_id', items: {$addToSet: '$headers.To'}}}, {$unwind:"$headers.To"}, { $match : {"headers.To":"jeff.dasovich@enron.com"}}, { $group: {_id:null,count:{$sum:1}}} ])
db.messages.aggregate([ { $match : {"headers.From":"susan.mara@enron.com"}}, {$unwind:"$headers.To"}, { $match : {"headers.To":"richard.shapiro@enron.com"}}, { $group: {_id:null,count:{$sum:1}}} ])
db.messages.aggregate([ { $match : {"headers.From":"soblander@carrfut.com"}}, {$unwind:"$headers.To"}, { $match : {"headers.To":"soblander@carrfut.com"}}, { $group: {_id:null,count:{$sum:1}}} ])
db.messages.aggregate([ { $match : {"headers.From":"susan.mara@enron.com"}}, {$unwind:"$headers.To"}, { $match : {"headers.To":"james.steffes@enron.com"}}, { $group: {_id:null,count:{$sum:1}}} ])
db.messages.aggregate([ { $match : {"headers.From":"evelyn.metoyer@enron.com"}}, {$unwind:"$headers.To"}, { $match : {"headers.To":"kate.symes@enron.com"}}, { $group: {_id:null,count:{$sum:1}}} ])
db.messages.aggregate([ { $match : {"headers.From":"susan.mara@enron.com"}}, {$unwind:"$headers.To"}, { $match : {"headers.To":"alan.comnes@enron.com"}}, { $group: {_id:null,count:{$sum:1}}} ])


/*** QUESTION 3 ***/
db.messages.update( {"headers.Message-ID":"<8147308.1075851042335.JavaMail.evans@thyme>"}, { $push: {"headers.To":"mrpotatohead@mongodb.com"}} )

/*** QUESTION 4 ***/
blog application

/*** QUESTION 5 ***/
db.fubar.explain().find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1})

/*** QUESTION 6 ***/
http://stackoverflow.com/questions/17296602/can-mongodb-inserts-be-made-faster-using-the-hint-and-natural-operators

/*** QUESTION 7 ***/

/*** QUESTION 8 ***/
Node1: P
Node2: S
Node3: S, delay 2 hours

w=majority
j=1

Time=0s WRITE
Time=5s Node 1 down. Not write operation, but written by Node 1 in DB
Time=3600s Node 2 - P

No rollback because data was written to database and journal has everything, so all nodes can be "synchronized"

/*** QUESTION 9 ***/

/*** QUESTION 10 ***/