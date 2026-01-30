#!/usr/bin/env python3
import json
import re
import sys
from typing import List, Tuple


def solve(capacity: int, leak_rate: int, events: List[Tuple[int, int]]) -> List[int]:
    """
    Leaky Bucket

    You get capacity, leak rate, and events. Each event is (time, amount).
    For each event: leak for the time since the previous event, then try to add
    amount. If level + amount > capacity, output -1 and stop. Otherwise output
    the new level.
    """

    return []

#  DO NOT CHANGE BELOW THIS LINE

def _read_input() -> Tuple[int, int, List[Tuple[int, int]]]:
    data = sys.stdin.read()
    nums = re.findall(r"-?\d+", data)
    if len(nums) < 2:
        return 0, 0, []

    idx = 0
    capacity = int(nums[idx])
    idx += 1
    leak_rate = int(nums[idx])
    idx += 1
    events: List[Tuple[int, int]] = []

    while idx + 1 < len(nums):
        t = int(nums[idx])
        a = int(nums[idx + 1])
        events.append((t, a))
        idx += 2

    return capacity, leak_rate, events


if __name__ == "__main__":
    capacity, leak_rate, events = _read_input()
    if capacity == 0 and leak_rate == 0 and not events:
        sys.exit(0)
    result = solve(capacity, leak_rate, events)
    sys.stdout.write(json.dumps(result))
