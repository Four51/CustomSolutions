#Cookie Store Expiration

Useful when you need to control the expiration of the user cookie to control session timeouts for 2.0 applications.

---

Load the [ipCookie module](https://github.com/ivpusic/angular-cookie) into `js/app.js`.  Be sure to reference it in the `index.html`.

Replace `js/services/securityService.js` with the file provided in this directory.

On line 14 of this file:
 
```javascript
ipCookie(_cookieName, this.currentUser, {expires:10,expirationUnit:'seconds'});
```

You will want to change the expiration timeout parameter to how long the user cookie ought to persist (it is currently set to 10 seconds to make it easily testable). The units can be seconds, minutes, hours, days, etc...
Read [the documentation on the `ipCookie` module](https://github.com/ivpusic/angular-cookie/blob/master/README.md) to see how you can change other details about the cookie.

