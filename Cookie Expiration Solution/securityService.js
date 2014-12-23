four51.app.factory('Security', ['$451', 'ipCookie', function($451, ipCookie) {
	var _cookieName = 'user.' + $451.apiName;
	return {
		init: function(user, auth) {
			this.currentUser = {
				SiteID: user.SiteID,
				Username: user.Username,
				InteropID: user.InteropID,
				FirstName: user.FirstName,
				LastName: user.LastName,
				Email: user.Email,
				Auth: auth
			};
			ipCookie(_cookieName, this.currentUser, {expires:10,expirationUnit:'seconds'});
		},
		clear: function() {
			ipCookie.remove(_cookieName);
		},
		auth: function() {
			var user = ipCookie(_cookieName);
			return user ? user.Auth : null;
		},
		isAuthenticated: function() {
			this.currentUser =  ipCookie(_cookieName);
			return !!this.currentUser;
		},
		logout: function() {
			ipCookie.remove(_cookieName);
			delete this.currentUser;
		}
	}
}]);