export default function($http, $q, $location) {

  let self = this;

  self.currentLoadingState = true;

  self.isLoading = () => {
    return self.currentLoadingState;
  }

  self.loading = () => {
    self.currentLoadingState = true;
  }

  self.loaded = () => {
    self.currentLoadingState = false;
  }

  return self;

}