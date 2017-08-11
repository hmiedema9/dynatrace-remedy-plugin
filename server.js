const express = require('express')  
const app = express()
const port = 8080
const bodyParser = require('body-parser');
'use strict';
const nodemailer = require('nodemailer');
var router = express.Router();
var soapRequest = require('handlebars-soap-request'); 

// for parsing JSON
app.use(bodyParser.json({ type: 'application/json' }));

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'username@example.com',
        pass: 'userpass'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'dynatrace-alerts@kp.org <dynatrace-alerts@kp.org>', // sender address
    to: 'hayden.miedema@dynatrace.com, haydenmiedema@gmail.com', // list of receivers
    subject: 'Test alert for problem notification', // Subject line
    text: 'Test alert', // plain text body
    html: '<b>Sending HTML in body</b>' // html body
};

app.use((request, response, next) => {  
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {  
  request.chance = Math.random()
  next()
})

app.get('/', (request, response) => {  
  response.json({
    chance: request.chance
  })
})

var options = {
    handlebarsTemplate: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:KP_Remedy_HPD_Incident_Create_v3">\
   <soapenv:Header>\
      <urn:AuthenticationInfo>\
         <urn:userName>WSKPORG</urn:userName>\
         <urn:password>eventexcavations8401</urn:password>\
         <!--Optional:-->\
         <urn:authentication></urn:authentication>\
         <!--Optional:-->\
         <urn:locale></urn:locale>\
         <!--Optional:-->\
         <urn:timeZone></urn:timeZone>\
      </urn:AuthenticationInfo>\
   </soapenv:Header>\
   <soapenv:Body>\
      <urn:createIncident>\
         <urn:action>CREATE</urn:action>\
         <urn:status>Assigned</urn:status>\
         <urn:impact>3-Moderate/Limited</urn:impact>\
         <urn:urgency>3-Medium</urn:urgency>\
         <urn:incidentType>Infrastructure Event</urn:incidentType>\
         <!--Optional:-->\
         <urn:customerNUID>WSKPORG</urn:customerNUID>\
         <urn:reportedSource>Systems Management</urn:reportedSource>\
         <urn:summary>TEST INCIDENT CREATION - DYNATRACE <NE></NE>W</urn:summary>\
         <!--Optional:-->\
         <urn:detailedDescription>This is a test incident created by a Node.js plugin from Dynatrace</urn:detailedDescription>\
         <urn:productCategorizationTier1>Software</urn:productCategorizationTier1>\
         <urn:productCategorizationTier2>Application</urn:productCategorizationTier2>\
         <urn:productCategorizationTier3>EBiz</urn:productCategorizationTier3>\
         <urn:productName>Ebiz - Application Support</urn:productName>\
         <!--Optional:-->\
         <urn:productManufacturer></urn:productManufacturer>\
         <!--Optional:-->\
         <urn:productModelVersion></urn:productModelVersion>\
         <!--Optional:-->\
         <urn:operationalCategorizationTier1></urn:operationalCategorizationTier1>\
         <!--Optional:-->\
         <urn:operationalCategorizationTier2></urn:operationalCategorizationTier2>\
         <!--Optional:-->\
         <urn:operationalCategorizationTier3></urn:operationalCategorizationTier3>\
         <!--Optional:-->\
         <urn:assignedWithinSupportCompany>Kaiser Permanente</urn:assignedWithinSupportCompany>\
         <!--Optional:-->\
         <urn:assignedSupportOrganization>Application Support</urn:assignedSupportOrganization>\
         <!--Optional:-->\
         <urn:assignedGroup>ASG DTAS APP SUP</urn:assignedGroup>\
         <!--Optional:-->\
         <urn:assignee></urn:assignee>\
         <!--Optional:-->\
         <urn:workInfo100Char></urn:workInfo100Char>\
         <!--Optional:-->\
         <urn:workInfo></urn:workInfo>\
         <!--Optional:-->\
         <urn:workInfoType>----- Customer Inbound -----</urn:workInfoType>\
         <!--Optional:-->\
         <urn:workInfoDateOcurred></urn:workInfoDateOcurred>\
         <!--Optional:-->\
         <urn:workInfoSource>Email</urn:workInfoSource>\
         <!--Optional:-->\
         <urn:workInfoLocked>No</urn:workInfoLocked>\
         <!--Optional:-->\
         <urn:workInfoCopyToRequest>Internal</urn:workInfoCopyToRequest>\
         <!--Optional:-->\
         <urn:secondaryContactNUID></urn:secondaryContactNUID>\
         <!--Optional:-->\
         <urn:vendorTicketNumber></urn:vendorTicketNumber>\
         <!--Optional:-->\
         <urn:region></urn:region>\
         <!--Optional:-->\
         <urn:siteGroup></urn:siteGroup>\
         <!--Optional:-->\
         <urn:site></urn:site>\
         <!--Optional:-->\
         <urn:serviceCI></urn:serviceCI>\
         <!--Optional:-->\
         <urn:causalCI></urn:causalCI>\
         <!--Optional:-->\
         <urn:impactedCIs></urn:impactedCIs>\
         <!--Optional:-->\
         <urn:eventClass></urn:eventClass>\
         <!--Optional:-->\
         <urn:eventKeyword></urn:eventKeyword>\
         <!--Optional:-->\
         <urn:eventSituationName></urn:eventSituationName>\
         <!--Optional:-->\
         <urn:environment></urn:environment>\
      </urn:createIncident>\
   </soapenv:Body>\
</soapenv:Envelope>',
	url: 'http://izxuwa5.ivdc.kp.org:9080/arsys/services/ARService?server=remedy-uat.kp.org&amp;webService=KP_Remedy_HPD_Incident_Create_v3'
};

soapRequest(options, function(err, response) {
	console.log("Finished")
});

// define soap params
    // var params = {
	// 	host   : 'http://izxuwa5.ivdc.kp.org:9080/',
	// 	path   : '/arsys/services/ARService',
    //     wsdl   : '/arsys/services/ARService?wsdl'

	// 	set soap headers (optional)
	// 	headers: [{
    //         AuthenticationInfo : {
    //             userName : 'WSKPORG',
    //             password : 'eventexcavations8401'
    //         }
    //     }]
    // }


/*
     * create the client
     */
    // var soapClient = easysoap.createClient(params);


        /*
		 * get all available functions
    	 */
		// soapClient.getAllFunctions()
        // 	.then((functionArray) => { console.log(functionArray); })
		// 	.catch((err) => { throw new Error(err); });


		/*
		 * get the method params by given methodName
         */
		// soapClient.getMethodParamsByName('createIncident')
        // 	.then((methodParams) => {
		// 		console.log(methodParams.request);
		// 		console.log(methodParams.response);
		// 	})
		// 	.catch((err) => { throw new Error(err); });


		// /*
		//  * call soap method
        //  */
    	// soapClient.call({
        // 	method    : 'createIncident',
		// 	attributes: {
        //     	xmlns: 'urn:KP_Remedy_HPD_Incident_Create_v3'
        //     },
		// 	params: {
        //         AuthenticationInfo: {
		// 			'userName'     : 'WSKPORG',
		// 			'password': 'eventexcavations8401'
        //         },
        //         action: 'CREATE',
		// 		status: 'Assigned',
        //         impact: '3-Moderate/Limited',
        //         urgency: '3-Medium',
        //         incidentType: 'Infrastructure Event',
        //         customerNUID: 'WSKPORG',
        //         reportedSource: 'Systems Management',
        //         summary: 'TEST INCIDENT CREATION',
        //         detailedDescription: 'This is a test incident created by a Node.js plugin from Dynatrace',
        //         productCategorizationTier1: 'Software',
        //         productCategorizationTier2: 'Application',
        //         productCategorizationTier3: 'EBiz',
        //         productName: 'Ebiz - Application Support',
        //         assignedWithinSupportCompany: 'Kaiser Permanente',
        //         assignedSupportOrganization: 'Application Support',
        //         assignedGroup: 'ASG DTAS APP SUP'
        //     }
        // })
        // .then((callResponse) => {
		// 	console.log(callResponse.data);	// response data as json
        //     console.log(callResponse.body);	// response body
		// 	console.log(callResponse.header);  //response header
        // })
		// .catch((err) => { throw new Error(err); });

app.post('/dynatrace', function(req, res) {
  var body = req.body;
  var problem_state = body.State;
  var problem_id = body.ProblemID;
  var problem_title = body.ProblemTitle;
  
  console.log("Data Below");
  console.log("Problem ID:", problem_id, "\nProblem State:", problem_state, "\nProblem Title:", problem_title);

  res.json({
      message: 'received message'
   });

   // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
 })

app.listen(port, (err) => {  
  if (err) {
    return console.log('Something went wrong', err)
  }

  console.log(`server is listening on ${port}`)
})