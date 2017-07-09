export default function($q, bomberService) {
  let self = this;
  
  self.OAUTH2_CLIENT_ID = '30232984133-2gb4lmoija8fgs9csreql2kqdog42a64.apps.googleusercontent.com';
  self.OAUTH2_SCOPES = ['https://www.googleapis.com/auth/youtube'];

  self.setYoutube = (callback) => {
    bomberService.subscribeYoutube().then( (res) => {
      callback();
    }, (err) => {
      console.log(err.data);
    });
  }

  self.isSubscribed = () => {

    let deferred = $q.defer();

    let handleAuthResult = (authResult) => {
      if (authResult && !authResult.error) {
        loadAPIClientInterfaces();
      } else {
        deferred.reject(authResult);
      }
    }

    let loadAPIClientInterfaces = () => {
      gapi.client.load('youtube', 'v3', function() {
        gapi.client.youtube.subscriptions.list({
          mine: true,
          forChannelId: "UCWQnyGY4b6ps-T4PFVB2hSw",
          maxResults: 50,
          part: 'snippet'
        }).execute( (response) => {
          if(response.items.length > 0) {
            self.setYoutube( () => {
              deferred.resolve();
            });
          } else {
            gapi.client.youtube.subscriptions.insert({
              snippet: {
                resourceId: {
                  channelId: "UCWQnyGY4b6ps-T4PFVB2hSw",
                  kind: "youtube#channel"
                },
              },
              part: "snippet"
            }).execute( (response) => {
              self.setYoutube( () => {
                deferred.resolve();
              });
            })
          }
        });
      });
    }

    gapi.auth.init(function() {
      window.setTimeout( () => {
        gapi.auth.authorize({
          client_id: self.OAUTH2_CLIENT_ID,
          scope: self.OAUTH2_SCOPES,
          immediate: false
        }, handleAuthResult);
      }, 1);
    });

    

    return deferred.promise;

  }

  

  return self;
}