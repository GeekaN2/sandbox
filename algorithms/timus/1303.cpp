#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

bool comp(pair<int, int> a, pair<int, int> b) {
	return a.first != b.first ? a.first < b.first : a.second > b.second;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0);

	int m;

	cin >> m;

	vector<pair<int, int>> a;
	vector<pair<int, int>> ans;

	while (true) {
		int l, r;
		
		cin >> l >> r;

		if (l == 0 && r == 0) {
			break;
		}

		if (l > m || r < 0) {
			continue;
		}

		a.push_back(make_pair(l, r));
	}

	sort(a.begin(), a.end(), comp);

	int right = 0;
	int j = 0;

	while (right < m) {
		int localRight = -1;

		for (int i = j; i < a.size(); i++) {
			if (a[i].first <= right && a[i].second > localRight) {
				localRight = a[i].second;
				j = i;
			}
		}

		if (localRight <= right) {
			break;
		} 

		right = localRight;
		ans.push_back(a[j]);
	}
	
	if (right < m) {
		cout << "No solution";

		return 0;
	}

	cout << ans.size() << "\n";

	for (int i = 0; i < ans.size(); i++) {
		cout << ans[i].first << " " << ans[i].second << "\n";
	}

	return 0;
}