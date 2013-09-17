define(['collections/_collection', 'models/solution'], function(_collection, Model){
  return _collection.extend({
    model: Model,

    // TODO: Load real models
    fetch: function() {

      var t = this;

      _(5).times(function(n){
        t.add(new t.model({
          title: "Issue " + n,
          id: n,
          description: "Nullam id dolor id nibh ultricies vehicula ut id elit."
        }));
      });

      // add this model to each area
      t.app.issues.each(function(i){
        i.set("solutions", t);
      });
    }
  });
});