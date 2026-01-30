# Leaky Bucket

## Problem
You have a bucket with capacity `Capacity`. It leaks at rate `LeakRate` units per second. Each event `(Time, Amount)` happens at time `Time` and tries to add `Amount`.

For each event: first leak for the time since the previous event, then try to add `Amount`. If `level + Amount > Capacity`, output `-1` and stop.

## Rules
- The bucket leaks continuously at rate `LeakRate` units per second when not empty.
- Events are in **non-decreasing time order**.

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
Return an array of numbers:
- One entry per processed event, in order.
- Each entry is the bucket level right after that event (leak first, then add).
- If an overflow happens (`level + amount > Capacity`), append `-1` and stop.

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

At `time=0`: leak `0` -> level `0`, add `7` -> level `7` (output `7`).  
At `time=1`: leak `2` -> level `5`, add `6` exceeds capacity (`5 + 6 > 10`), output `-1` and stop.

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

At `time=0`: leak `0` -> level `0`, add `5` -> level `5` (output `5`).  
At `time=2`: leak `6` -> level `0`, add `5` -> level `5` (output `5`).  
At `time=3`: leak `3` -> level `2`, add `1` -> level `3` (output `3`).

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

At `time=0`: leak `0` -> level `0`, add `6` -> level `6` (output `6`).  
At `time=1`: leak `1` -> level `5`, add `6` exceeds capacity (`5 + 6 > 10`), output `-1` and stop.

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
