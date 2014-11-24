//Add this template file, as well as mandrill.js to your index file
//Replace mandrillAPIKey, template_name, template_content, subject, from_email, from_name, 'to' objects, and Reply-To with your data

//template_name matches up to your Mandrill template's slug value, which can be found when editing your Mandrill Outbound Template

//template_content is an array of objects that serve as custom parameters to use within your Mandrill template
//The 'name' property matches up to mc:edit="customobjectname" in your template. The value you pass in 'content' will be used as the text of that HTML element. Example: <div mc:edit="customMCparameter1"></div>

//If you have complicated HTML to display within your template, it's easiest to build up that HTML within this service and pass it as the content of a custom parameter.
//Example:

    /*
    var imageHTML = "<a href='" + variant.ProductionURL + "' target='_blank'><img src='" + variant.PreviewUrl + "'></a>";
     var template_content = [
         {
         "name": 'imagehtml',
         "content": imageHTML
         }
     }
    */
    //This string can be used within the Mandrill template like so: <div mc:edit="imagehtml"></div>

//The 'subject', 'from_email', etc. properties of the message object can be hardcoded (if they will always be the same), or can be passed dynamically to your service by adding an additional parameter to your _send method
//For example, you could pass a LineItem object and obtain the subject, email addresses, etc. from the LineItem's specs

//The message.to property is an array of recipient objects. If you want to send the email to one recipient, only include one object in the array.

//This example is called from a controller and does not have a "success" function. If you wanted to do so in order to display some message to the user that the email was successful, add a
//success parameter in which you pass your success function. Within that function, you can adjust $scope variables accordingly depending on the Mandrill result.

four51.app.factory('Email', ['$resource', function($resource) {

    var _send = function(parameters) {
        var mandrillAPIKey = ""; //Enter your API key here
        mandrill_client = new mandrill.Mandrill(mandrillAPIKey);

        var template_name = ""; //Enter Mandrill Template Slug Here

        var template_content = [
            {
                "name": 'customMCparameter1',
                "content": parameters.CustomParameter1
            },
            {
                "name": 'customMCparameter2',
                "content": parameters.CustomParameter2
            }
        ];
        var message = {
            'subject': "Enter Subject Here",
            'from_email': "Enter From Email Address Here",
            'from_name': "Enter From Name Here",
            'to': [
                {
                'email': "Enter To Email Address 1 Here",
                'name': "Enter To Email Name 1 Here",
                'type': 'to'
                },
                {
                    'email': "Enter To Email Address 2 Here",
                    'name': "Enter To Email Name 2 Here",
                    'type': 'to'
                },
            ],
            'headers': {
                'Reply-To': "Enter Reply To Email Address Here"
            },
            'important': false
        };
        var async = false;
        var ip_pool = "Main Pool";

        mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
            console.log(result);
        }, function(e) {
            console.log('A Mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    };

    return {
        send: _send
    }
}]);