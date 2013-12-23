

shinystreets.issues = function(params) {

  var issues = shinystreets.models;

  issues.prototype.resourceUrl = function(){ return "issues.json"; };
  issues.prototype.resourceName = function(){ return "issues"; };
  issues.prototype.oneResourceName = function(){ return "issue"; };

  return new issues(params);
}

shinystreets.issue = function(params) {

  var issue = shinystreets.model;

  issue.prototype.resourceName = function(){ return "issues"; };
  issue.prototype.oneResourceName = function(){ return "issue"; };

  return new issue(params);
};