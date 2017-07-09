export default function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: './views/pages/login.html',
      resolve: {
        // redirectIfNotAuthenticated: _redirectIfNotAuthenticated
      },
      controller: 'loginController',
      controllerAs: 'vm'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: './views/pages/profile.html',
      resolve: {
        // redirectIfNotAuthenticated: _redirectIfNotAuthenticated
      },
      controller: 'profileController',
      controllerAs: 'vm'
    })
  
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  function _redirectIfNotAuthenticated($q, $state) {
    let deferred = $q.defer();

    window.fbAsyncInit = function() {
      console.log('Init facebook middleware')
      FB.init({
        appId: '306540069757852',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.9'
      });

      FB.getLoginStatus(function(response) {

        console.log(response)

        if (response.status === 'connected') {
          console.log('connected');
          deferred.resolve();
          return;
        }

        console.log('not connected');
        deferred.reject();
        $state.go("login");
        
      });
    };

    (function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
    }(document));
    
    return deferred.promise;
  }

  // 
  $httpProvider.interceptors.push( ($q, $location) => {
    return {
      response: function(response) {
        return response;
      },
      responseError: function(response) {
        if (response.status === 401) {
          $location.url('/');
        }

        return $q.reject(response);
      }
    };
  });

  // Middleware to add accessToken
  $httpProvider.interceptors.push( (facebookService) => {
    return {
      request: function(request) {
        if(request.url.indexOf('/api') == 0) {
          request.headers.accessToken = facebookService.getAccessToken();
        }
        return request;
      }
    };
  });



}