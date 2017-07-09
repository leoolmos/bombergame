export default function($q, $rootScope) {

  let self = this;

  let accessToken;

  self.login = (callback) => {
    FB.login( (response) => {
      if (response.status === 'connected') {
        self.accessToken = response.authResponse.accessToken;
        callback(true);
        return;
      }
      callback(false);
    }, {scope: 'public_profile,user_friends'});
  }

  self.getAccessToken = () => {
    return self.accessToken;
  }

  self.isAuthenticate = () => {

    let deferred = $q.defer();

    FB.init({
      appId: '306540069757852',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.9'
    });

    FB.getLoginStatus(function(response) {

      if (response.status === 'connected') {
        self.accessToken = response.authResponse.accessToken;
        deferred.resolve(true);
        return;
      }
      
      deferred.resolve(false)

    });

    return deferred.promise;
  }

  self.getFriends = () => {
    let deferred = $q.defer();

    FB.api("/me/friends?access_token=" + self.accessToken, function (response) {

      if(!response || response.error) {
        deferred.reject(response.error);
        return
      }

      deferred.resolve(response);

    });

    return deferred.promise;
  }

  return self;

}