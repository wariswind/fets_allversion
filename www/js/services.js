// JavaScript Document
// all services including web servicing using get are all decleared here
angular.module('fetswallet.services', [])
.factory('stateLocalGov', function($http) {  
	return $http.get('lib/json/state_localgov.json');   
})
.factory('religion', function($http) { 
   
	return $http.get('lib/json/religion_tb.json');    
})
.factory('country', function($http) { 
    return $http.get('lib/json/country_tb.json');
})
.factory('title', function($http) { 
    return $http.get('lib/json/title.json');
})


