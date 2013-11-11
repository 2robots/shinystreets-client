

shinystreets.model = function(params) {
  var t = this;

  t.resourceName = shinystreets.model.prototype.resourceName();
  t.oneResourceName = shinystreets.model.prototype.oneResourceName();

  return t.findById(params.id, null);
};

shinystreets.model.prototype.resourceName = function() { return ""; };
shinystreets.model.prototype.oneResourceName = function() { return ""; };

/**
 * finds one item by it's id in localStorage.
 * @param id: id to search for
 * @param fallback: will be returned, in the case no item was found
 * @returns found item
 */
shinystreets.model.prototype.findById = function(id, fallback) {

  var ret = fallback;
  var items = JSON.parse(window.localStorage.getItem(this.resourceName));
  $.each(items, function(){
    if(this.id == id) {
      console.log(this);
      ret = this;
    }
  });

  return ret;
};