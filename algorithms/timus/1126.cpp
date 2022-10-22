#include <iostream>
#include <algorithm>
#include <vector>
#include <map>
#include <queue>
#include <set>

using namespace std;

int getMax(vector<int>& a, int from) {
	int max = a[from];

	for (int i = from + 1; i < a.size(); i++) {
		if (a[i] > max) {
			max = a[i];
		}
	}

	return max;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0);

	int m, a, i = 0;

	cin >> m;

	vector<int> n(m);

	do {
		cin >> a;

		if (a == -1) {
			break;
		}

		if (i < m) {
			n[i] = a;
			i++;

			if (i == m) {
				cout << getMax(n, i - m) << "\n";
			}

			continue;
		}
		
		n.push_back(a);
		cout << getMax(n, i + 1 - m) << "\n";
		
		i++;
	} while (a != -1);

	return 0;
}