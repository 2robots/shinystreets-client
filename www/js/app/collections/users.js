define(['collections/_collection', 'models/user'], function(_collection, Model){
  return _collection.extend({
    model: Model,

    // TODO: Load real models
    fetch: function() {
      this.add(new this.model({
        email: "franz@2robots.at",
        id: 1,
        bio: "Maecenas faucibus mollis interdum.",
        avatar: "http://2robots.at/logo.png",
        areas: this.app.areas
      }));
    }
  });
});