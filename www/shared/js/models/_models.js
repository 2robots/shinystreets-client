

shinystreets.models = function(params) {

  var t = this;

  // needs to be overwritten
  t.resourceUrl = shinystreets.models.prototype.resourceUrl();
  t.resourceName = shinystreets.models.prototype.resourceName();
  t.oneResourceName = shinystreets.models.prototype.oneResourceName();
  t.dataType = shinystreets.models.prototype.dataType();

  return {
    dataSource: DevExpress.data.createDataSource({
      load: function(loadOptions) {
        var dfd = new $.Deferred();

        // if we simple want to refresh the view, load from localStorage
        if(loadOptions.refresh && t.getItems().length > 0) {
          dfd.resolve(t.getItems());

        // if we need to update from server
        } else {
          t.refreshFromServer(function(newItems){
            dfd.resolve(newItems);
          });
        }

        return dfd.promise();
      }
    })
  };
};

/**
 * this parameters must be overwritten
 */
shinystreets.models.prototype.resourceUrl = function() { return ""; };
shinystreets.models.prototype.resourceName = function() { return ""; };
shinystreets.models.prototype.oneResourceName = function() { return ""; };
shinystreets.models.prototype.dataType = function() {
  return shinystreets.defaultDataType;
};

/**
 * get all items from localStorage.
 * @returns all items from localStorage.
 */
shinystreets.models.prototype.getItems = function() {
  var items = JSON.parse(window.localStorage.getItem(this.resourceName));

  if(items == null) {
    items = [];
  }

  return items;
};

/**
 * replace all localStorage items with new ones. This will also
 * update the latestItem reference.
 * @param items: all new items
 * @param append: if true, items will be append to items, and don't replace
 * them.
 */
shinystreets.models.prototype.setItems = function(items, append) {

  var t = this;

  $.each(items, function(){

    // if there is already a latestItem
    if(t.latestItem() != null) {
      if($(this).updated_at > t.latestItem().updated_at) {
        window.localStorage.setItem("latest_" + t.oneResourceName, ko.toJSON({
          id: this.id,
          updated_at: this.updated_at
        }));
      }

    // if not
    } else {
      window.localStorage.setItem("latest_" + t.oneResourceName, ko.toJSON({
        id: this.id,
        updated_at: this.updated_at
      }));
    }
  });

  // check for append
  if(append === true) {
    items = t.getItems().concat(items);
  }

  window.localStorage.setItem(t.resourceName, ko.toJSON(items));
};

/**
 * returns the latest item in the collection.
 * @return latest object in collection
 */
shinystreets.models.prototype.latestItem = function() {
  return JSON.parse(window.localStorage.getItem("latest_" + this.oneResourceName));
};

/**
 * load data from server and parse it.
 * @param callback: will be called, after load has finished.
 * @param data: add optional data to the request.
 */
shinystreets.models.prototype.loadFromServer = function(callback, data) {

  var t = this;

  if(typeof(data) == "undefined" || data == null) {
    data = [];
  }

  $.get(
    shinystreets.baseUrl + "/" + t.resourceUrl,
    data,
    function(data, status, jqXHR){

      if(t.dataType == "json") {
        t.setItems(data, true);
        callback(data, status);
      }
    },
    t.dataType
  );
};

/**
 * load new data from server and save it to localStorage.
 * @param callback: will be called, after refresh das finished.
 */
shinystreets.models.prototype.refreshFromServer = function(callback) {
  var latest = this.latestItem();
  var data = {};

  if(latest != null) {
    data["after"] = latest.updated_at;
  }
  this.loadFromServer(callback, data);
};