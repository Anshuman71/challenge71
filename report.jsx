var React = require('react');
var ReactPivot = require('react-pivot');
var createReactClass = require('create-react-class');

var rows = require('./data.json');

var dimensions = [
  {
    value: 'date',
    title: 'Date',
  },
  {
    value: 'host',
    title: 'Host',
  },
];

var reduce = function(row, payload) {
  payload.impressions =
    (payload.impressions || 0) + parseInt(row['type'] === 'impression' ? 1 : 0);
  payload.loads =
    (payload.loads || 0) + parseInt(row['type'] === 'load' ? 1 : 0);
  payload.displays =
    (payload.displays || 0) + parseInt(row['type'] === 'display' ? 1 : 0);
  payload.loadRate = parseFloat(payload.loads / payload.impressions) * 100;
  payload.displayRate = parseFloat(payload.displays / payload.loads) * 100;
  return payload;
};

var calculations = [
  {
    title: 'Impressions',
    value: 'impressions',
    template: function(val, row) {
      return val;
    },
  },
  {
    title: 'Loads',
    value: 'loads',
    template: function(val, row) {
      return val;
    },
  },
  {
    title: 'Displays',
    value: 'displays',
    template: function(val, row) {
      return val;
    },
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    template: function(val, row) {
      return val.toFixed(1) + '%';
    },
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    template: function(val, row) {
      return val.toFixed(1) + '%';
    },
  },
];

module.exports = createReactClass({
  render() {
    return (
      <ReactPivot
        rows={rows}
        reduce={reduce}
        calculations={calculations}
        dimensions={dimensions}
      />
    );
  },
});
