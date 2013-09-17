define(['collections/_collection', 'models/issue'], function(_collection, Model){
  return _collection.extend({
    model: Model,

    // TODO: Load real models
    fetch: function() {

      var t = this;

      _(20).times(function(n){

        var images = [];
        _(Math.floor(Math.random()*10)).times(function(i){
          images.push("http://2robots.at/logo.png");
        });

        t.add(new t.model({
          title: "Grünflächen auf der Donauinsel bewässern " + n,
          id: n,
          description: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla.",
          updated_at: moment("Sep 14, 2013"),
          user: t.app.users.first(),
          is_new: (n % 3 == 0),
          images: images
        }));
      });

      // add this model to each area
      t.app.areas.each(function(a){
        a.set("issues", t);
      });

      // add this model to each area
      t.app.users.each(function(u){
        u.set("issues", t);
      });
    }
  });
});