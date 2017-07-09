export default function($state, facebookService, loadingStateService) {

  let self = this;

  self.login = () => {
    facebookService.login( (response) => {
      if(response) {
        $state.go('profile');
      }
    })
  }

  loadingStateService.loaded();

}