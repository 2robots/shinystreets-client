<% if(showmap) { %>
<% } %>

<% if(model.get("images").length > 0) { %>
  <div class="scroll_well">
    <ul class="images scroll_list">
      <% _.each(model.get("images"), function(image){ %>
        <li>
          <% if(enablephotoswipe) { %><a href="<%= image %>"><% } %>
            <img src="<%= image %>" />
          <% if(enablephotoswipe) { %></a><% } %>
        </li>
      <% }); %>
    </ul>
  </div>
<% } %>