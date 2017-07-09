import * as request from 'request';
import UsersModel from '../models/users';

let Users = {}

Users.exist = (req, res, next) => {
  UsersModel.findOne({ facebook_id: req.faceBookUser.id }, function(err, user) {
    if(err) {
      res.status(500).send();
      return;
    }
    if(user == null) {
      res.send(false);    
    } else {
      res.jsonp(true);
    }
  });
}

Users.get = (req, res, next) => {
  UsersModel.findOne({ facebook_id: req.faceBookUser.id }, function(err, user) {
    if(err) {
      res.status(500).send();
      return;
    }
    if(user == null) {
      res.status(404).send();    
    } else {
      res.jsonp(user);
    }
  });
}

Users.create = (req, res, next) => {
  let newUser = new UsersModel({
    facebook_id: req.faceBookUser.id,
    name: req.faceBookUser.name,
    picture: req.body.picture || "http://graph.facebook.com/v2.9/" + req.faceBookUser.id + "/picture?type=large"
  });

  newUser.save( (err, user) => {
    if(err) {
      res.status(500).send()
      return;
    }

    res.jsonp(user);
  })
}


Users.getFriends = (req, res, next) => {
  request.get("https://graph.facebook.com/v2.9/" + req.faceBookUser.id + "/friends?access_token=" + req.headers.accesstoken, function(err, response, body) {
    if(err) {
      res.status(500).send();
      return;
    }

    let friends = [];
    let mercs = [];

    JSON.parse(response.body).data.map( (userFriend) => {
      friends.push(userFriend.id);
    });

    UsersModel.findOne({ facebook_id: req.faceBookUser.id }, function(err, user) {
      user.mercs.map( (userMerc) => {
        mercs.push(userMerc);

        let index = friends.indexOf(userMerc);

        if (index > -1) {
          friends.splice(index, 1);
        }

      })

      UsersModel.find( { facebook_id: { $in : friends } } , (err, userFriends) => {
        res.jsonp(userFriends)
      });
    });
    
  });
}

Users.getMercs = (req, res, next) => {
  UsersModel.findOne({ facebook_id: req.faceBookUser.id }, function(err, user) {
    if(err) {
      res.status(500).send();
      return;
    }
    if(user == null) {
      res.status(404).send();    
    } else {
      let mercs = [];

      user.mercs.map( (userMerc) => {
        mercs.push(userMerc);
      });

      UsersModel.find( { facebook_id: { $in : mercs } } , (err, userMercs) => {
        res.jsonp(userMercs);
      })
    }
  });
}

Users.addMercs = (req, res, next) => {
  UsersModel.findOne({ facebook_id: req.faceBookUser.id }, function(err, user) {
    if(err) {
      res.status(500).send();
      return;
    }
    if(user == null) {
      res.status(404).send();
      return;
    } else {
      if(user.mercs.length == 4) {
        res.status(400).send("Sorry, you exceed the limit of mercs.");
        return;
      }
      if(user.mercs.length == 3) {

        // Check youtube 
        // if(!NOT VALID) {
        //   res.status(400).send("Sorry, you exceed the limit of mercs.");
        //   return;
        // }

      }

      user.mercs.push(req.body.merc_id);

      user.save( (err, user) => {
        if(err) {
          console.log(err)
          res.status(500).send()
          return;
        }

        res.jsonp(user);
      })
    }
  })
}

Users.subscribeYoutube = (req, res, next) => {
  UsersModel.findOne({ facebook_id: req.faceBookUser.id }, function(err, user) {
    if(err) {
      res.status(500).send();
      return;
    }
    if(user == null) {
      res.status(404).send();
      return;
    } else {
      user.youtube = true;

      user.save( (err, user) => {
        if(err) {
          console.log(err)
          res.status(500).send()
          return;
        }

        res.jsonp(user);
      })
    }

  })
}

Users.deleteMercs = (req, res, next) => {
  UsersModel.findOne({ facebook_id: req.faceBookUser.id }, function(err, user) {
    if(err) {
      res.status(500).send();
      return;
    }
    if(user == null) {
      res.status(404).send();
      return;
    } else {
      let index = user.mercs.indexOf(req.params.facebook_id);

      if (index > -1) {
        user.mercs.splice(index, 1);
      }

      user.save( (err, user) => {
        if(err) {
          console.log(err)
          res.status(500).send()
          return;
        }

        res.jsonp(user);
      })
    }

  })

}


export default Users;
