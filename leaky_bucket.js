#!/usr/bin/env node

'use strict';

const fs = require('fs');

/**
 * Leaky Bucket
 *
 * Capacity C, leak rate R, and a list of (time, amount) events.
 * The bucket leaks continuously at rate R when not empty.
 * For each event:
 * 1) Leak based on time delta.
 * 2) If adding exceeds capacity, output -1 and stop.
 * 3) Otherwise add and output the level.
 *
 * @param {number} C
 * @param {number} R
 * @param {Array<[number, number]>} events
 * @returns {number[]}
 */
function solve(C, R, events) {
  return []
}

// DO NOT CHANGE BELOW THIS LINE

if (require.main === module) {
  const data = fs.readFileSync(0, 'utf8');
  const nums = data.match(/-?\d+/g);
  if (!nums || nums.length < 2) process.exit(0);

  let idx = 0;
  const C = Number(nums[idx++]);
  const R = Number(nums[idx++]);
  const events = [];

  while (idx + 1 < nums.length) {
    const t = Number(nums[idx++]);
    const a = Number(nums[idx++]);
    events.push([t, a]);
  }

  const result = solve(C, R, events);
  process.stdout.write(JSON.stringify(result));
}

module.exports = { solve };
