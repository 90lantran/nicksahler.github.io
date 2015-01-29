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

App.PostView = Ember.View.extend({
  didInsertElement: function() {}
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
        return $.get('./posts/' + data.file)
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
function hire() {
  var availability = [
    { range: 'Jul 14 – Jul 20', available: false },
    { range: 'Jul 21 – Jul 27', available: false },
    { range: 'Jul 28 – Aug 3', available: false },
    { range: 'Aug 4 – Aug 10', available: true },
    { range: 'Aug 11 – Aug 17', available: true },
    { range: 'Aug 18 – Aug 24', available: true },
    { range: 'Aug 25 – Aug 31', available: true },
    { range: 'Sep 1 – Sep 7', available: true },
    { range: 'Sep 8 – Sep 14', available: true },
    { range: 'Sep 15 – Sep 21', available: true },
    { range: 'Sep 22 – Sep 28', available: true },
    { range: 'Sep 29 – Oct 5', available: true }
  ]

  tabulate('.availability', availability, ['range', 'available']).selectAll('td')
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
}

// For tables
function tabulate(element, data, columns) {
  var table = d3.select(element).append('table');

  var rowData = function(row) {
    var mapColumns = function(column) {
      return {column: column, value: row[column]};
    };
    return columns.map(mapColumns);
  };

  var rows = table
    .selectAll('tr')
      .data(data)
      .enter()
    .append('tr');

  var cells = rows
    .selectAll('td')
      .data(rowData)
      .enter()
    .append('td')
      .text(function(d) { return d.value; });
  
  return table;
}

/*
function showCodeChart() {
  var data = [ 
    {name: 'Javascript', value: 3},
    {name: 'Java', value:  3},
    {name: 'HTML', value:  3},
    {name: 'CSS', value:  3},

    {name: 'C', value:  2},
    {name: 'BASIC', value:  2},
    {name: 'ASM', value:  2},
    {name: 'LabVIEW', value:  2},
    {name: 'C#', value:  2},
    {name: 'PHP', value:  2},
    {name: 'AS3', value:  2},

    {name: 'C++', value:  1},
    {name: 'Ruby', value:  1},
    {name: 'Python', value:  1},
    {name: 'Haskell', value:  1},
    {name: 'Rust', value:  1},
  ];

  var barHeight = 20;
  var barMargin = 5;
  var unitSize = 75;
  var height = 1000;
  var width = data.length * (barHeight + barMargin);

  var chart = d3.select('.code-chart')
    .attr('width', width)
    .attr('height', height);

  var bar = chart.selectAll('g')
      .data(data)
    .enter().append('g');

  var color = d3.scale.ordinal().range(['#FA8072', '#FAAD72', '#FFDC00', '#01FF70', '#0074D9', '#87ACEB', '#A487EB']);

  bar.append('rect')
      .attr('x', function(d, i) {
          return (i * (barHeight + barMargin));
      })
      .attr('y', 20)    
      .attr('width', barHeight)
      .attr('height', 0)
      .attr('fill', '#FFF')

  bar.append('text')
    .text(function(d) { return d.name; })
      .attr('x', function(d, i) {
        return (i * (barHeight + barMargin)) + (barHeight/2) + 4;
      })
      .attr('y', 10)
      .attr('width', barHeight)
      .attr('fill', '#000')

  for (var i = 0; i < 3; i++)
    bar.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', i * unitSize)
      .attr('y2', i * unitSize)
      .attr('stroke', '#FFF');

  bar.selectAll('rect')
    .transition()
      .attr('height', function(d) { return d.value * unitSize; })
      .delay(function(d, i) { return i * 250; })
      .duration(250)
      .ease('out')
    .attr('fill', function(d, i) {
      return d3.rgb(color(d.name)).darker(i).toString();
    });
}*/