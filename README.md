# Leaky Bucket

## Problem
You are given a leaky bucket that models traffic shaping. The bucket has a fixed capacity and leaks at a constant rate. A sequence of input events adds water/packets at specific times. If an addition would exceed capacity, the bucket **leaks/overflows**, and you must output `-1` and stop.

For each event, output the bucket level immediately after processing that event.

## Rules
- The bucket leaks continuously at rate `R` units per second when not empty.
- Events are given in **non-decreasing time order**.

## Input Format
```
C R
t1 a1
t2 a2
...
tN aN
```
- `C` = capacity (`C > 0`)
- `R` = leak rate per second (`R > 0`)
- `ti` = event time (integer, non-decreasing)
- `ai` = amount added (integer, `ai > 0`)

## Output Format
Return an array of numbers:
- One entry per processed event.
- If an overflow happens (capacity), append `-1` and stop.

## Examples

### Example 1 (capacity overflow)
**Input**
```
10 2
0 7
1 6
3 4
5 3
```

**Output**
```
[7, -1]
```

**Explanation**
At `t=0`, the bucket is empty, add `7` -> level `7`.
At `t=1`, leak `2` (rate `2` for `1s`) -> level `5`, add `6` would exceed capacity (`5 + 6 > 10`), so output `-1` and stop.

### Example 2 (no overflow)
**Input**
```
8 3
0 5
2 5
3 1
```

**Output**
```
[5, 5, 3]
```

**Explanation**
At `t=0`, add `5` -> level `5`.
At `t=2`, leak `6` -> level `0`, add `5` -> level `5`.
At `t=3`, leak `3` -> level `2`, add `1` -> level `3`.

### Example 3 (burst overflow)
**Input**
```
10 1
0 6
1 6
```

**Output**
```
[6, -1]
```

**Explanation**
At `t=0`, add `6` -> level `6`.
At `t=1`, leak `1` -> level `5`, adding `6` exceeds capacity (`5 + 6 > 10`), so output `-1` and stop.

## Solution
Implement the simulation exactly as described in the rules. The reference solution is in `leaky_bucket.js` and exposes a `solve(C, R, events)` function that returns an array.

## Run Tests
```
npm test
```
