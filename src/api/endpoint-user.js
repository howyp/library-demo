var user = {"name":"Neil Moorcroft",
   	        "id":1,
   	        "username":"neil"};

exports.load = function(req, res) {
	res.send(200, user);
};