angular.module('OrderCloud-Mandrill', []);

angular.module('OrderCloud-Mandrill')
    .factory('Email', Email);
;

function Email() {
    var service = {
        send: send
    };
    return service;

    function send(parameters) {
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
    }
}