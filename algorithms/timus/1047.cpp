#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

bool greaterThenLast(vector<double> a, vector<double> &c, double a1) {
	int n = c.size();
	double last = a[n + 1];

	a[1] = a1;

	for (int i = 2; i <= n + 1; i++) {
		a[i] = 2 * a[i - 1] - a[i - 2] + 2 * c[i - 2];
	}


	return a[n + 1] > last;
}

int main() {
	double n;
	
	cin >> n;

	vector<double> a(n + 2);
	vector<double> c(n);

	cin >> a[0] >> a[n + 1];

	for (int i = 0; i < n; i++) {
		cin >> c[i];
	}

	double l = -2001, r = 2001;

	while (r - l > 0.001) {
		double mid = (r + l) / 2;

		if (greaterThenLast(a, c, mid)) {
			r = mid;
		}
		else {
			l = mid;
		}
	}

	cout << fixed << setprecision(2) << r;

	return 0;
}