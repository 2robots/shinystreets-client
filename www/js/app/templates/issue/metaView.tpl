<img class="avatar" src="<%= model.get("user").get("avatar") %>" />
<p class="date"><span class="icn time"></span><strong><%= model.get("updated_at").fromNow(true) %></strong></p>
<p class="comments"><span class="icn comment"></span><strong><%= model.get("comments").length %></strong><% if(!showsolutions) { %> Kommentare<% } %></p>
<% if(showsolutions) { %>
  <p class="solutions"><span class="icn solution"></span><strong><%= model.get("solutions").length %></strong> Lösungen</p>
<% } %>
<p class="c"></p>