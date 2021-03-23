#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

bool comp(pair<int, int> a, pair<int, int> b) {
	return a.second != b.second ? a.second < b.second : a.first < b.first;
}

int main() {
	int n;

	cin >> n;

	vector<pair<int, int>> a(n);
	vector<pair<int, int>> ans;

	for (int i = 0; i < n; i++) {
		cin >> a[i].first >> a[i].second;

		if (a[i].first > a[i].second) {
			swap(a[i].first, a[i].second);
		}
	}

	sort(a.begin(), a.end(), comp);

	ans.push_back(a[0]);

	for (int i = 1; i < n; i++) {
		if (a[i].first >= ans[ans.size() - 1].second) {
			ans.push_back(a[i]);
		}
	}

	cout << ans.size() << "\n";

	for (int i = 0; i < ans.size(); i++) {
		cout << ans[i].first << " " << ans[i].second << "\n";
	}

	return 0;
}