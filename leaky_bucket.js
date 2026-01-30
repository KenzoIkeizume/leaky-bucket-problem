#!/usr/bin/env node

'use strict';

const fs = require('fs');

/**
 * Leaky Bucket
 *
 * You get capacity, leak rate, and events. Each event is [time, amount].
 * For each event: leak for the time since the previous event, then try to add
 * amount. If level + amount > capacity, output -1 and stop. Otherwise output
 * the new level.
 *
 * @param {number} capacity
 * @param {number} leakRate
 * @param {Array<[number, number]>} events - [time, amount]
 * @returns {number[]}
 */
function solve(capacity, leakRate, events) {
  return []
}

// DO NOT CHANGE BELOW THIS LINE

if (require.main === module) {
  const data = fs.readFileSync(0, 'utf8');
  const nums = data.match(/-?\d+/g);
  if (!nums || nums.length < 2) process.exit(0);

  let idx = 0;
  const capacity = Number(nums[idx++]);
  const leakRate = Number(nums[idx++]);
  const events = [];

  while (idx + 1 < nums.length) {
    const t = Number(nums[idx++]);
    const a = Number(nums[idx++]);
    events.push([t, a]);
  }

  const result = solve(capacity, leakRate, events);
  process.stdout.write(JSON.stringify(result));
}

module.exports = { solve };
