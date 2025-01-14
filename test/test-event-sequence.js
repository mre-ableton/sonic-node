var assert = require("assert");

require("../js/sequencing/sequencing.js");

var eventList =
[
  { position: "1.1.1", value: 1},
  { position: "2.2.3", value: 2}
];

makePosition = function(positionString)
{
  return convertToPosition(positionString, new Signature(), kTicksPerBeats);
}
var content = [];

eventList.forEach(function(event)
{
  position = makePosition(event.position)
  content.push({ position: position, value: event.value});
});

var result = 0;
var sequence = new EventSequence();
sequence.connect(function(value)
{
  result = value;
});
sequence.setContent(content, 2);

var testPosition = makePosition("1");
sequence.tick(testPosition);
assert.equal(result, 1);

testPosition = makePosition("2.2.3");
sequence.tick(testPosition);
assert.equal(result, 2);

// expect trigger at loop wrapping
testPosition = makePosition("3");
sequence.tick(testPosition);
assert.equal(result, 1);

// can triggger backwards
testPosition = makePosition("2.2.3");
sequence.tick(testPosition);
assert.equal(result, 2);
