window.App = Ember.Application.create();

App.Router.map(function () {
  this.resource('post', { path: '/:id'});
});

/* TODO(nicksahler): Move searchy crap to static functions in Post */

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('./index.json')
      .then(function(data) {
        return data.filter(function(post) {
          return post.tags.contains('blog');
        });
      })
  },

  afterModel: function() {
    document.title = 'index';
  }
});

App.IndexController = Ember.ArrayController.extend({
  sortProperties: ['published'],
  sortAscending: false
});

App.PostController = Ember.ObjectController.extend({

});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    var model = Ember.Object.create({});

    return $.getJSON('./index.json')
      .then(function(data) {
        return data.find(function(post) {
          return post.slug === params.id;
        });
      })
      .then(function(data) {
        document.title = data.title;
        model.setProperties(data);
        return $.get('./_posts/' + data.file)
          .then(function(md) {
            model.set('html', marked(md));
          });
      }).then(function() {
        return model;
      });
  }
});

Ember.Handlebars.registerBoundHelper('date', function(date, format) {
  return moment(date).format(format);
});

/* TODO(nicksahler): lollazy */
/*globals jQuery, document */
(function ($) {
  $(document).ready(function(){
    var availability = [
      { range: "Jul 14 – Jul 20", available: false },
      { range: "Jul 21 – Jul 27", available: false },
      { range: "Jul 28 – Aug 3", available: false },
      { range: "Aug 4 – Aug 10", available: true },
      { range: "Aug 11 – Aug 17", available: true },
      { range: "Aug 18 – Aug 24", available: true },
      { range: "Aug 25 – Aug 31", available: true },
      { range: "Sep 1 – Sep 7", available: true },
      { range: "Sep 8 – Sep 14", available: true },
      { range: "Sep 15 – Sep 21", available: true },
      { range: "Sep 22 – Sep 28", available: true },
      { range: "Sep 29 – Oct 5", available: true }
    ]

    tabulate('.availability', availability, ["range", "available"]).selectAll("td")
      .text(
        function(d) {
          return ((d.column === 'available') ? (d.value ? 'Available' : 'Booked') : d.value + ': ');
        }
      )
      .attr('style',
        function(d) {
          return (d.column === 'available' && !d.value)? 'color: #DDD' : 'color: #000';
        }
      );
  });
}(jQuery));

// For tables
function tabulate(element, data, columns) {
  var table = d3.select(element).append("table");

  var rowData = function(row) {
    var mapColumns = function(column) {
      return {column: column, value: row[column]};
    };
    return columns.map(mapColumns);
  };

  var rows = table
    .selectAll("tr")
      .data(data)
      .enter()
    .append("tr");

  var cells = rows
    .selectAll("td")
      .data(rowData)
      .enter()
    .append("td")
      .text(function(d) { return d.value; });
  
  return table;
}