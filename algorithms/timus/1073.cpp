#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0);

	int n;

	cin >> n;

	vector<int> d(n + 1);
	d[0] = 0;

	for (int i = 1; i <= n; i++) {
		int best = 4;

		for (int j = 1; j <= 250; j++) {
			if (i >= j * j) {
				d[i] = d[i - j * j] + 1;
			}
			if (d[i] < best) {
				best = d[i];
			}
		}

		d[i] = best;
	}

	cout << d[n];

	return 0;
}