#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <string>

using namespace std;

vector<vector<int>> d(901, vector<int>(8101));
vector<vector<int>> ans(901, vector<int>(8101));

string calc(int s1, int s2) {
	if (s1 > 900 || s2 > 8100 || !d[s1][s2]) {
		return "No solution";
	}

	string res = "";

	while (s1 != 0 && s2 != 0) {
		int num = ans[s1][s2];

		res = res + to_string(num);
		s1 -= num;
		s2 -= num * num;
	}

	sort(res.begin(), res.end());

	if (res.size() > 100) {
		return "No solution";
	}

	return res;
}

void precalc() {
	ans[0][0] = 1;

	for (int i = 0; i < 901; i++) {
		for (int j = 0; j < 8101; j++) {
			for (int k = 1; k < 10; k++) {
				if (i >= k && j >= k * k && ans[i - k][j - k * k] && (d[i][j] == 0 || d[i - k][j - k * k] + 1 < d[i][j])) {
					ans[i][j] = k;
					d[i][j] = d[i - k][j - k * k] + 1;
				}
			}
		}
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0);

	int t;

	cin >> t;

	precalc();

	for (int i = 0; i < t; i++) {
		int s1, s2;
		
		cin >> s1 >> s2;

		cout << calc(s1, s2) << "\n";
	}


	return 0;
}