
![enter image description here](https://tools.answerdash.com/admin/media/logos/logo-transparent.png)


----------

AnswerDash is a software as a service used to provide Help Desk functionality on a website in the form of Question and Answers.  When a customer proposes a new question, your answer is captured and added to the Q&A library to help every future customer.

View a Slideshare from AnswerDash <strong><a href="//www.slideshare.net/LuanTran3/answerdash-for-ecommerce" title="AnswerDash for E-Commerce (3 mins)" target="_blank">here</a></strong>.

To learn more about this feature and see examples, visit this [page](https://volition.four51ordercloud.com/store/product/AnswerDash#example). 

>**Note:** Expect to spend one hour for initial setup.  AnswerDash is free to try, and contains a variety of subscription plans.  http://www.answerdash.com/pricing 

##Setup
###1. Create an account with AnswerDash.
Go to http://www.answerdash.com/create-account and create your account.

>**Note:** The free account provides up to 200 tab clicks per month and unlimited agents.  If you need more tab clicks, AnswerDash offers annual and month-to-month plans; you can cancel anytime.

###2. Identify your base OrderCloud URL.
This URL is used to help preview and setup AnswerDash on your OrderCloud site.  For example, buyername.four51ordercloud.com/store

###3. Preview the tab on your site.
Install the AnswerDash Chrome Extension .  The extension injects a JavaScript snippet in every page you view in your browser. It does not affect how others see your site.
>**Note:** You can disable the Extension any time by visiting Chrome Settings > Extensions > AnswerDash Administrator Extension.

###4. Style AnswerDash.
Style AnswerDash to match your site colors and fonts.

###5. Add Your contact information.
![](https://tools.answerdash.com/admin/media/screenshots/livechat-status.png)

Enter in your contact information if you want a Contact Info button to appear within  AnswerDash.  Here you can share a phone number, support email, physical address, and logo.

###6. Add your support email.
Provide a support email address to receive all new questions and a daily digest of new, unpublished questions.
>**Note:** Best practice is to respond through your normal support process to customers who ask questions, then setting aside time daily to edit questions and publish generalized answers. The more Q&A you publish, the fewer tickets you'll get.

###7. Think about integrating with live chat.
AnswerDash provides a list of integrated live chat partners that can be configured to assist your live chat agents from spending time answering the same questions over and over.  With integration, visitors can see live chat status on the AnswerDash tab.  When visitors do not find what they need in AnswerDash, they can escalate to live chat.

>**Note:** AnswerDash reports that live chat integrated customers see significant live chat volume reductions, but a significant increase in the quality and usefulness of the live chats that do happen.

###8. Add your AnswerDash authors.
Assign people from your organization to be a moderator, admin or owner.  The owner (there can only be one) is an admin that can also update payment information.  Admins are moderators that can configure a site's settings.  A moderator's job is to write useful, concise, generalized answers to incoming questions for future visitors to see. 

>**Note:** Think about who would be your best moderators, as it is key to deflecting frequently asked questions through self-service.

###9. Decide where the AnswerDash tab appears.
Add URL's where you would like the tab to appear.  To reuse AnswerDash across sites or to to match variable parts of URLs an asterisk* can be used. For example, if you have buyerone.four51ordercloud.com/store and buyertwo.four51ordercloud.com/shop you would use:
```html
    *.four51ordercloud.com/*
```
>**Note:**  It is possible to setup Page Groups to specify sections of the site that should have separate questions.
>
###10. Install
AnswerDash will provide a code snippet to install on your OrderCloud site.  We recommend putting this script at the bottom of the index.html file just before the ending `</body>` tag.  For example:

            <script src="js/directives/orderbuttons.js" data-group="source"></script>
    
    <!-- Start of AnswerDash script -->
    <script>var AnswerDash;!function(e,t,n,s,a){if(!t.getElementById(s)){var i,r=t.createElement(n),c=t.getElementsByTagName(n)[0];e[a]||(i=e[a]=function(){i.__oninit.push(arguments)},i.__oninit=[]),r.type="text/javascript",r.async=!0,r.src="https://p1.answerdash.com/answerdash.min.js?siteid=xyz",r.setAttribute("id",s),c.parentNode.insertBefore(r,c)}}(window,document,"script","answerdash-script","AnswerDash");</script>
    <!-- End of AnswerDash script -->]
    
    </body>
    <!-- <![endif]-->
    </html>

>**Note:** This will display AnswerDash on every view in your OrderCloud site(s) depending on the configuration created in the previous step #9.

##Usage
###1. Add your content.
The AnswerDash tab should now be installed on your OrderCloud site.  All that is left to do is provide some content.  The AnswerDash setup wizard will prompt you to add new questions or choose from a library of existing questions.
###2. Launch your questions and answers.
After you have provided the content, you will click 'On' within the AnswerDash interface to activate your code snippet.  Once this step is completed, login to your OrderCloud site to view the tab in action.


