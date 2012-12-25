'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');


//mongolab service

app.factory("User", function ($mongolabResourceHttp) {
	return $mongolabResourceHttp('users');
});

app.factory("Track", function ($mongolabResourceHttp) {
	return $mongolabResourceHttp('tracks');
});
