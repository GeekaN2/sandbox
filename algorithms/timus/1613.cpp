#include <iostream>
#include <algorithm>
#include <cmath>
#include <unordered_map>
#include <vector>
#include <string>

using namespace std;

int resolveTest(unordered_map<int, vector<int>>& cities) {
	int l, r, num;

	cin >> l >> r >> num;

	l--;
	r--;

	if (cities.find(num) == cities.end()) {
		return 0;
	}

	auto left = lower_bound(cities.at(num).begin(), cities.at(num).end(), l);

	if (left == cities.at(num).end()) {
		return 0;
	}

	if (*left >= l && *left <= r) {
		return 1;
	}

	return 0;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);

	int n, testn;
	string ans = "";
	
	cin >> n;

	unordered_map<int, vector<int>> a(n);

	for (int i = 0; i < n; i++) {
		int city;

		cin >> city;

		a[city].push_back(i);
	}

	for (auto city : a) {
		sort(city.second.begin(), city.second.end());
	}

	cin >> testn;

	for (int i = 0; i < testn; i++) {
		cout << resolveTest(a);
	}

	return 0;
}