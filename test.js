(function() {

    "use strict";

	var easysoap = require('easysoap');

    // define soap params
    var params = {
		host   : 'www.sample.com',
		path   : '/path/soap/',
        wsdl   : '/path/wsdl/',

		// set soap headers (optional)
		headers: [{
            'name'     : 'item_name',
            'value'    : 'item_value',
            'namespace': 'item_namespace'
        }]
    }

    /*
     * create the client
     */
    var soapClient = easysoap.createClient(params);


        /*
		 * get all available functions
    	 */
		soapClient.getAllFunctions()
        	.then((functionArray) => { console.log(functionArray); })
			.catch((err) => { throw new Error(err); });


		/*
		 * get the method params by given methodName
         */
		soapClient.getMethodParamsByName('methodName')
        	.then((methodParams) => {
				console.log(methodParams.request);
				console.log(methodParams.response);
			})
			.catch((err) => { throw new Error(err); });


		/*
		 * call soap method
         */
    	soapClient.call({
        	method    : 'methodName',
			attributes: {
            	xmlns: 'http://www.sample.com'
            },
			params: {
				testParam: 1,
				testParam: [2, 3],
				testParam: {
					'_value'     : 4,
					'_attributes': {
                    	'xmlns1': 'http://www.sample.com/other'
                    }
                }
            }
        })
        .then((callResponse) => {
			console.log(callResponse.data);	// response data as json
            console.log(callResponse.body);	// response body
			console.log(callResponse.header);  //response header
        })
		.catch((err) => { throw new Error(err); });

}();