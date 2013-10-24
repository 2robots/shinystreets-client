

shinystreets.issues = function(params) {
  var viewModel = {
    dataSource: DevExpress.data.createDataSource({
      load: function(loadOptions) {
        var dfd = new $.Deferred();

        if(loadOptions.refresh) {
          var items = window.localStorage.getItem("issues");
          dfd.resolve(items);
        } else {
          var items = window.localStorage.getItem("issues");

          // TODO: load items and save it to localStorage
          items.push({id: 3, title: "One Issue"});

          window.localStorage.setItem("issues", items);

          dfd.resolve(items);
        }
        return dfd.promise();
      }
    })
  };

  return viewModel;
};

shinystreets.issue = function(params) {

  console.log(params);

  var viewModel = {
    id: params.id,
    title: ko.observable('')
  };
  /*$.get('http://sampleservices.devexpress.com/api/Products/' + viewModel.id)
  .done(function (data) {
      viewModel.name(data.ProductName);
  });*/

  return viewModel;
};