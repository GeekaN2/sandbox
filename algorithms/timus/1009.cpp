#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0);

	int n, k;

	cin >> n >> k;

	long long ans = 0;
	vector<int> d(n + 1);

	d[1] = (k - 1);
	d[2] = (k - 1) * k;

	for (int i = 3; i <= n; i++) {
		d[i] = (d[i - 1] + d[i - 2]) * (k - 1);
	}

	cout << d[n];

	return 0;
}