define(['views/_base/baseView', 'views/_base/contentListView', 'views/issue/thumbView'], function(_baseView, _contentListView, issueThumbView) {
  return _baseView.extend({

    className: 'view area',
    defaults: {
      header: {
        title: "Undefined area",
        buttons: {
          left: "settings",
          right: "login"
        }
      },
      content: {
        view: _contentListView,
        listItemView: issueThumbView,
        models: []
      }
    },

    afterInitialize: function() {
      this.options.header.title = this.options.model.get("title");
      this.options.content.models = this.options.model.get("issues");
    }
  });
});