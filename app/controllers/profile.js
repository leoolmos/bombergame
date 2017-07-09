export default function(bomberService, youtubeService, facebookService, loadingStateService) {

  let self = this;
  self.user = {};
  self.friends, self.mercs = [];

  loadingStateService.loaded();

  // Get User Details
  bomberService.userExist().then( (userExist) => {
    if(userExist) {

      bomberService.getMe().then( (user) => {
        self.user = user;
        self.init();
      })

      return;
    }

    bomberService.createUser().then( (user) => {
      self.user = user;
      self.init();
    }, (err) => {
      console.log(err);
    })

  });

  self.init = () => {

    self.isSlotLocked = (position) => {
      if(position == 3) {
        return !self.user.youtube
      }
      return false;
    }

    // Get User Friends
    bomberService.getFriends().then( (friends) => {
      self.friends = friends;
    })

    // Get Mercs
    bomberService.getMercs().then( (mercs) => {
      self.mercs = mercs;
    })

    self.updateObj = (removeFrom, addTo, facebook_id) => {
      let user;

      self[removeFrom] = self[removeFrom].filter( (item) => {
        if(item.facebook_id == facebook_id) {
          user = item;
          return false;
        };

        return true;
      })

      self[addTo].push(user);
    }

    self.selectMerc = (facebook_id) => {
      if(self.mercs.length == 3) {
        if(!self.user.youtube) {
          alert("Subscribe to our channel to add one more friend")
          return;
        }

      }
      bomberService.addMerc(facebook_id).then( () => {
        self.updateObj('friends', 'mercs', facebook_id);
      }, (err) => {
        console.log(err);
      });
    }

    self.removeMerc = (facebook_id) => {
      bomberService.deleteMerc(facebook_id).then( () => {
        self.updateObj('mercs', 'friends', facebook_id);
      }, (err) => {
        console.log(err);
      });
    }

    self.connectYoutube = () => {
      youtubeService.isSubscribed().then( (res) => {
        self.user.youtube = true;
      }, (err) => {
        console.log(err);
      });
    }

  }


}