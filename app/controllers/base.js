export default function(loadingStateService) {

  this.isLoading = () => {
    return loadingStateService.isLoading();
  }

}