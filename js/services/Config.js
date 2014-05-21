angular.module('shinystreets.Config', [], function($provide){
  $provide.factory('Config', function(storage){

    return {
      name: 'shinystreets',
      endpoint: 'http://dev.shinystreets.com',
      //endpoint: '/test',
      userConfig: function() {
        return storage.get(this.name + '_UserConfig');
      },
      saveUserConfig: function(key, value) {
        var u = this.userConfig();
        u[key] = value;
        storage.set(this.name + '_UserConfig', u);
      }
    };
  });
});
