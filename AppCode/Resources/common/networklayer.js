var networkFactory = {};

networkFactory.questionUrl = 'https://api.myjson.com/bins/vt8zx';
networkFactory.answerUrl = 'https://api.myjson.com/bins/19i7wt';

networkFactory.GetToServer = function(url, timeOut, fnOnLoad, fnOnError) {
	timeOut = 20000;

	Ti.API.info('url:' + url);
	networkFactory.xhr = Titanium.Network.createHTTPClient();
	networkFactory.xhr.setTimeout(timeOut);
	networkFactory.xhr.onload = fnOnLoad;
	networkFactory.xhr.onerror = fnOnError;
	//networkFactory.xhr.setRequestHeader('Content-Type', 'application/json');
	networkFactory.xhr.open('GET', url);
	networkFactory.xhr.send();

};
/*
 Purpose:XML parse the response.It returns the xml-parsed response
 */
networkFactory.ResponseOnLoad = function() {
	networkFactory.result = this.responseText;
	networkFactory.doc = JSON.parseString(networkFactory.result);

};

networkFactory.Abort = function() {
	if (networkFactory.xhr !== null && networkFactory.xhr !== undefined) {
		networkFactory.xhr.abort();
	}
};

exports.networkFact = function() {
	return networkFactory;
};

