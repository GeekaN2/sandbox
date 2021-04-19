#include <iostream>
#include <algorithm>
#include <vector>
#include <map>
#include <queue>
#include <set>
#include <stack>

using namespace std;

int main() {
	stack<int> s;
	int n;

	cin >> n;

	vector<int> a(n);

	for (int i = 0; i < n; i++) {
		int k;

		cin >> k;

		a[i] = k;
	}

	for (int i = 1, inspect = 0; i <= n; i++) {
		s.push(i);

		while (!s.empty() && a[inspect] == s.top()) {
			s.pop();
			inspect++;
		}
	}

	if (!s.empty()) {
		cout << "Cheater";
	}
	else {
		cout << "Not a proof";
	}

	return 0;
}