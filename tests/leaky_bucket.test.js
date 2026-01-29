'use strict';

const assert = require('assert');
const { solve } = require('../leaky_bucket');

function test(name, C, R, events, expected) {
  const actual = solve(C, R, events);
  assert.deepStrictEqual(
    actual,
    expected,
    `${name} failed. Expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`
  );
}

// Difficulty: Easy

// No events should return empty output
test('easy-no-events', 10, 2, [], []);

// Single event, no leak needed
test('easy-single-event', 10, 5, [
  [0, 7]
], [7]);

// Exact capacity fit after leak
// t=0: add 6 -> 6
// t=2: leak 4 -> 2, add 8 -> 10 (exact cap)
test('easy-exact-capacity', 10, 2, [
  [0, 6],
  [2, 8]
], [6, 10]);

// Leak to zero before next add
// t=0: add 4 -> 4
// t=5: leak 10 -> 0, add 3 -> 3
test('easy-leak-to-zero', 10, 2, [
  [0, 4],
  [5, 3]
], [4, 3]);

// Difficulty: Medium

// Zero leak rate
// t=0: add 4 -> 4
// t=1: leak 0 -> 4, add 5 -> 9
test('medium-zero-leak', 10, 0, [
  [0, 4],
  [1, 5]
], [4, 9]);

// Capacity overflow
// t=0: add 7 -> 7
// t=1: leak 2 -> 5, add 6 would exceed capacity -> -1
test('medium-capacity-overflow', 10, 2, [
  [0, 7],
  [1, 6],
  [3, 4],
  [5, 3]
], [7, -1]);

// No overflow with multiple events
// t=0: add 5 -> 5
// t=2: leak 6 -> 0, add 5 -> 5
// t=3: leak 3 -> 2, add 1 -> 3
test('medium-no-overflow', 8, 3, [
  [0, 5],
  [2, 5],
  [3, 1]
], [5, 5, 3]);

// Multiple events at same time (dt=0, no leak)
test('medium-same-time-events', 10, 2, [
  [0, 3],
  [0, 4],
  [0, 2]
], [3, 7, 9]);

// Difficulty: Hard

// Overflow should stop processing remaining events
test('hard-stop-on-overflow', 10, 1, [
  [0, 8],
  [1, 4], // overflow here
  [2, 1]  // should not be processed
], [8, -1]);

// Capacity overflow after partial leak
// t=0: add 6 -> 6
// t=1: leak 1 -> 5, add 6 exceeds cap 10 -> -1 (burst ok)
test('hard-capacity-overflow', 10, 1, [
  [0, 6],
  [1, 6]
], [6, -1]);

// Exact capacity after multiple small leaks
// t=0: add 9 -> 9
// t=1: leak 2 -> 7, add 3 -> 10
test('hard-exact-capacity', 10, 2, [
  [0, 9],
  [1, 3]
], [9, 10]);

// Long idle time clears level
// t=0: add 9 -> 9
// t=10: leak 20 -> 0, add 9 -> 9
test('hard-long-idle-reset', 10, 2, [
  [0, 9],
  [10, 9]
], [9, 9]);

// Very large dt drains fully before add
// t=0: add 10 -> 10
// t=100: leak 1000 -> 0, add 5 -> 5
test('hard-very-large-dt', 10, 10, [
  [0, 10],
  [100, 5]
], [10, 5]);

// Large leak rate with sparse events
// t=0: add 8 -> 8
// t=4: leak 40 -> 0, add 7 -> 7
// t=5: leak 10 -> 0, add 10 -> 10
test('hard-large-leak', 10, 10, [
  [0, 8],
  [4, 7],
  [5, 10]
], [8, 7, 10]);

console.log('All tests passed.');
