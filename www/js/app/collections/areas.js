define(['collections/_collection', 'models/area'], function(_collection, Model){
  return _collection.extend({
    model: Model,

    // TODO: Load real models
    fetch: function() {
      this.add(new this.model({title: "Wien", id: 1}));
      this.add(new this.model({title: "Mauerbach", id: 2}));
    }
  });
});