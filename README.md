# Leaky Bucket

## Problem
You have a bucket with a maximum fill limit `Capacity`. The value really represents the **maximum level the bucket can hold**. Each event `(Time, Amount)` happens at time `Time` and tries to add `Amount` to the bucket. The bucket leaks at rate `LeakRate` units per second.

The `level` is the **current amount of water in the bucket** at that moment. The output is the **level after each event**.

For each event: first leak for the time since the previous event, then try to add `Amount`. If that would overflow, output `-1` and stop.

## Rules
- The bucket leaks continuously at rate `LeakRate` units per second when it is not empty.
- The bucket level cannot go below `0`.
- Events are in **non-decreasing time order**.
- Time can jump forward between events (gaps are allowed).
- If the level after adding exceeds `Capacity`, the bucket overflows.

## Input Format
```
Capacity LeakRate
time1 amount1
time2 amount2
...
timeN amountN
```
- `Capacity` = bucket capacity (`Capacity > 0`)
- `LeakRate` = leak rate per second (`LeakRate > 0`)
- `time` = event time (integer, non-decreasing)
- `amount` = amount added (integer, `amount > 0`)

## Output Format
Return an array of numbers representing the **current level after each event**:
- One entry per processed event, in order.
- Each entry is the bucket level right after that event (leak first, then add).
- If an overflow happens, append `-1` and stop.

## Examples

### Example 1 (no overflow)
**Input**
```
8 3
---
0 5
2 5
3 1
```

**Output**
```
[5, 5, 3]
```

**Explanation**

At `time=0`: leak `0` -> level `0`, add `5` -> level `5` (output `5`).  
At `time=2`: leak `6` -> level `0`, add `5` -> level `5` (output `5`).  
At `time=3`: leak `3` -> level `2`, add `1` -> level `3` (output `3`).

### Example 2 (capacity overflow)
**Input**
```
10 2
---
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

At `time=0`: leak `0` -> level `0`, add `7` -> level `7` (output `7`).  
At `time=1`: leak `2` -> level `5`, add `6` exceeds capacity (`5 + 6 > 10`), output `-1` and stop.

## Solution
Implement the simulation exactly as described in the rules. The reference solution is in `leaky_bucket.js` and exposes a `solve(Capacity, LeakRate, events)` function that returns an array.

## Run Tests
JavaScript:
```
npm test
```

Python:
```
python -m unittest discover -s tests
```
