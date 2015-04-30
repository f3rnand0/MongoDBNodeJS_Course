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

/*** QUESTION 6 ***/

/*** QUESTION 7 ***/

/*** QUESTION 8 ***/

/*** QUESTION 9 ***/

/*** QUESTION 10 ***/