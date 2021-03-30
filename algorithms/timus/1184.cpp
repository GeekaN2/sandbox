#include <iostream>
#include <vector>
#include <iomanip>

using namespace std;

long long numberOfCabels(vector<long long>& a, double x) {
	long long ans = 0;

	for (int i = 0; i < a.size(); i++) {
		ans += a[i] / x;
	}

	return ans;
}

int main() {
	long long n, k;
	
	cin >> n >> k;

	vector<long long> a(n);
	
	for (int i = 0; i < n; i++) {
		double k;

		cin >> k;

		a[i] = long long(k * 100);
	}

	int l = 0, r = 10000001;

	while (r > l) {
		int mid = (r + l) / 2 + 1;
		
		if (numberOfCabels(a, mid) < k) {
			r = mid - 1;
		}
		else {
			l = mid;
		}
	}

	cout << fixed << setprecision(2) << r / 100.0;

	return 0;
}