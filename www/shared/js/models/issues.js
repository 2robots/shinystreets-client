
shinystreets.issues = function(params) {
  var viewModel = {
    dataSource: [
      {id: 1, title: "Lorem Ipsum"},
      {id: 2, title: "Lorem Ipsum 2"}
    ]
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