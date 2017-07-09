export default function($rootScope, $state, facebookService) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {

    if ($rootScope.isLogged === undefined) {
      event.preventDefault();

      window.fbAsyncInit = function() {

        $rootScope.isLogged = false;

        facebookService.isAuthenticate().then( (isLogged) => {
          if(isLogged) {

            $rootScope.isLogged = true;

            if (toState.name === 'login') {
              $state.go("profile");
              return
            }

            $state.go(toState.name);
            return;
          }

          if (toState.name === 'profile') {
            $state.go("login");
            return
          }

          $state.go(toState.name);

        })

      };

      (function(d) {
        var js, id = 'facebook-jssdk',
          ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
          return; }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
      }(document));
    }

  });
}
