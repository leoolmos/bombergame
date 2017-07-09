import * as request from 'request';

function AuthMiddleware(req, res, next) {

  request.get("https://graph.facebook.com/me?access_token=" + req.headers.accesstoken, function(error, response, body) {
    if(error) {
      console.log('Error')
      res.status(500).send();
      return;
    }

    if(response.statusCode != 200) {
      console.log('401')
      res.status(401).send();
      return;
    }

    req.faceBookUser = JSON.parse(response.body);

    next();
  })

}

export default AuthMiddleware;
