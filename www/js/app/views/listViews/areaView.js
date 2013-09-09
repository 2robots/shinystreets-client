define(['views/listViews/issuesView'], function(issuesView) {
  return issuesView.extend({

    afterInitialize: function() {
      this.options.header.title = this.options.model.get("title");
      this.options.content.models = this.options.model.get("issues");
    }
  });
});