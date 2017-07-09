export default function($http, $q, $location) {

  this.userExist = () => {
    let deferred = $q.defer();

    $http.get('/api/me/exist').then( (exist) => {
      deferred.resolve(exist.data);
    }, (err) => {
      deferred.reject(err.data);
    });

    return deferred.promise;
  }

  this.subscribeYoutube = () => {

    let deferred = $q.defer();

    let req = {
      method: 'POST',
      url: '/api/me/youtube'
    }

    $http(req).then( () => {
      deferred.resolve();
    }), (err) => {
      deferred.reject(err.data);
    }

    return deferred.promise;

  }

  this.getMe = () => {
    let deferred = $q.defer();

    $http.get('/api/me').then( (user) => {
      deferred.resolve(user.data);
    }, (err) => {
      deferred.reject(err.data);
    });

    return deferred.promise;
  }

  this.createUser = () => {
    let deferred = $q.defer();

    let req = {
      method: 'POST',
      url: '/api/me',
      data: {
        // picture: 
      }
    }

    $http(req).then( (user) => {
      deferred.resolve(user.data);
    }), (err) => {
      deferred.reject(err.data);
    }

    return deferred.promise;
  }

  this.getFriends = () => {
    let deferred = $q.defer();

    $http.get('/api/me/friends').then( (friends) => {
      deferred.resolve(friends.data);
    }, (err) => {
      deferred.reject(err.data);
    });

    return deferred.promise;
  }

  this.getMercs = () => {
    let deferred = $q.defer();

    $http.get('/api/me/mercs').then( (friends) => {
      deferred.resolve(friends.data);
    }, (err) => {
      deferred.reject(err.data);
    });

    return deferred.promise;
  }

  this.addMerc = (merc_id) => {
    let deferred = $q.defer();

    let req = {
      method: 'POST',
      url: '/api/me/mercs',
      data: {
        merc_id: merc_id
      }
    }

    $http(req).then( () => {
      deferred.resolve();
    }), (err) => {
      deferred.reject(err.data);
    }

    return deferred.promise;

  }

  this.deleteMerc = (merc_id) => {
    let deferred = $q.defer();

    let req = {
      method: 'DELETE',
      url: '/api/me/mercs/' + merc_id,
      data: {
        merc_id: merc_id
      }
    }

    $http(req).then( () => {
      deferred.resolve();
    }), (err) => {
      deferred.reject(err.data);
    }

    return deferred.promise;

  }

  return this;

}