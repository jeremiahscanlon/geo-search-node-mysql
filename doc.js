var mysql = require('mysql');

function getByZipAndDistance(zip, distanceInMiles, callback) {
	var myLat = 0;
	var myLong = 0;
	var res = [];

	var con = mysql.createConnection({
		host:  'localhost',
		user: 'root',
		password: 'root',
		database: 'doctors',
		port: 8889
	});

	con.connect(function(err){
		if (err) {
			console.log(err);
		}
		console.log('connected!');
	})

	con.query("SELECT * FROM zips WHERE zip='"+zip+"'", function(err,rows){
		if (err) {
			console.log(err);
		}
		if (rows.length == 0){
			var err = new Error();
			err.message = 'No zip code information found for zip: '+zip;
			return callback(err);
		}
		console.log(rows[0]);
	});
};

var myZip = process.argv[2];
var miles = process.argv[3];

getByZipAndDistance(myZip,miles,function(err,result){
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
//getByZipAndDistance('07508',5);