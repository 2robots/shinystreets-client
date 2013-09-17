define(['collections/_collection', 'models/comment'], function(_collection, Model){
  return _collection.extend({
    model: Model,

    // TODO: Load real models
    fetch: function() {

      var t = this;

      _(9).times(function(n){
        t.add(new t.model({
          id: n,
          text: "Nullam id dolor id nibh ultricies vehicula ut id elit."
        }));
      });

      // add this model to each area
      t.app.issues.each(function(i){
        i.set("comments", t);
      });
    }
  });
});