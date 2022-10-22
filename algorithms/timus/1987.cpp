#include <iostream>
#include <vector>
#include <algorithm>
#include <stack>
#define ll long long

using namespace std;

struct seg {
	int l;
	int r;
	int i;
};

int main() {
	ll n, m;
	
	cin >> n;

	vector<seg> a(n);
	stack<seg> s;

	for (ll i = 0; i < n; i++) {
		ll l, r;

		cin >> l >> r;

		a[i].l = l;
		a[i].r = r;
		a[i].i = i + 1;
	}

	cin >> m;

	for (ll i = 0, j = 0; j < m; j++) {
		ll p;

		cin >> p;

		while (!s.empty() && s.top().r < p) {
			s.pop();
		}

		while ((!s.empty() && i < n && a[i].l >= s.top().l && a[i].r <= s.top().r && a[i].l <= p) || (s.empty() && i < n)) {
			s.push(a[i++]);

			if (s.top().r < p) {
				s.pop();
			}
		}

		while (!s.empty() && p > s.top().r) {
			s.pop();
		}

		if (!s.empty() && p >= s.top().l && p <= s.top().r) {
			cout << s.top().i << endl;
		} 
		else {
			cout << -1 << endl;
		}
	}

	return 0;
}