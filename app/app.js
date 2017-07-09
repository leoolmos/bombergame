import Routes from './routes';
import RangeService from './filters/range';
import BomberService from './services/bomber';
import FacebookService from './services/facebook';
import AuthMiddleware from './services/authMiddleware';
import Youtube from './services/youtube';
import LoadingStateService from './services/loadingStateService';
import BaseController from './controllers/base';
import LoginController from './controllers/login';
import ProfileController from './controllers/profile';

angular
  .module('splashDamage', [ 'ui.router'] )
  .config( Routes )
  .run(AuthMiddleware)
  .filter('range', RangeService)
  .factory('youtubeService', Youtube)
  .factory('bomberService', BomberService)
  .factory('facebookService', FacebookService)
  .factory('loadingStateService', LoadingStateService)
  .controller('baseController', BaseController)
  .controller('loginController', LoginController)
  .controller('profileController', ProfileController);