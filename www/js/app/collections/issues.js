define(['collections/_collection', 'models/issue'], function(_collection, Model){
  return _collection.extend({
    model: Model,

    // TODO: Load real models
    fetch: function() {

      _(20).times(function(n){
        this.add(new this.model({
          title: "Issue " + n,
          id: n,
          description: "Nullam id dolor id nibh ultricies vehicula ut id elit."
        }));
      });
    }
  });
});