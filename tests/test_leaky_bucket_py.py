import unittest

from leaky_bucket import solve


class LeakyBucketTests(unittest.TestCase):
    def test_easy_no_events(self) -> None:
        self.assertEqual(solve(10, 2, []), [])

    def test_easy_single_event(self) -> None:
        self.assertEqual(solve(10, 5, [(0, 7)]), [7])

    def test_easy_exact_capacity(self) -> None:
        self.assertEqual(solve(10, 2, [(0, 6), (2, 8)]), [6, 10])

    def test_easy_leak_to_zero(self) -> None:
        self.assertEqual(solve(10, 2, [(0, 4), (5, 3)]), [4, 3])

    def test_medium_zero_leak(self) -> None:
        self.assertEqual(solve(10, 0, [(0, 4), (1, 5)]), [4, 9])

    def test_medium_capacity_overflow(self) -> None:
        self.assertEqual(solve(10, 2, [(0, 7), (1, 6), (3, 4), (5, 3)]), [7, -1])

    def test_medium_no_overflow(self) -> None:
        self.assertEqual(solve(8, 3, [(0, 5), (2, 5), (3, 1)]), [5, 5, 3])

    def test_medium_same_time_events(self) -> None:
        self.assertEqual(solve(10, 2, [(0, 3), (0, 4), (0, 2)]), [3, 7, 9])

    def test_hard_stop_on_overflow(self) -> None:
        self.assertEqual(solve(10, 1, [(0, 8), (1, 4), (2, 1)]), [8, -1])

    def test_hard_capacity_overflow(self) -> None:
        self.assertEqual(solve(10, 1, [(0, 6), (1, 6)]), [6, -1])

    def test_hard_exact_capacity(self) -> None:
        self.assertEqual(solve(10, 2, [(0, 9), (1, 3)]), [9, 10])

    def test_hard_long_idle_reset(self) -> None:
        self.assertEqual(solve(10, 2, [(0, 9), (10, 9)]), [9, 9])

    def test_hard_very_large_dt(self) -> None:
        self.assertEqual(solve(10, 10, [(0, 10), (100, 5)]), [10, 5])

    def test_hard_large_leak(self) -> None:
        self.assertEqual(solve(10, 10, [(0, 8), (4, 7), (5, 10)]), [8, 7, 10])


if __name__ == "__main__":
    unittest.main()
