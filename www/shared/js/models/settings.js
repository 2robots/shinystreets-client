shinystreets.settings = function(params) {
  var viewModel = {
    email: ko.observable('', {persist: 'settings.email'}),
    password: ko.observable('', {persist: 'settings.password'})
  };

  return viewModel;
};