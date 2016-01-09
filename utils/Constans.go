package utils


const (
	//--Usage example: -- select temporal_filter('ar_spt', 'Equals', 10, 10, 200, 200);
	QUERY_TEMPORAL string = "select temporal_filter('%s', '%s', '%s', '%s');"

// HTTPMethodPost represents the HTTP Method for POST requests, literally "POST".
	HTTPMethodPost string = "POST"
// HTTPMethodPut represents the HTTP Method for PUT requests, literally "PUT".
	HTTPMethodPut string = "PUT"
// HTTPMethodPatch represents the HTTP Method for PATCH requests, literally "PATCH".
	HTTPMethodPatch string = "PATCH"
// HTTPMethodDelete represents the HTTP Method for DELETE requests, literally "DELETE".
	HTTPMethodDelete string = "DELETE"
)

