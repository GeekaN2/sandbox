#include <iostream>
#include <string>

using namespace std;

int main() {
	int n;

	cin >> n;

	if (n == 0) {
		cout << "10";
		return 0;
	}

	if (n == 1) {
		cout << 1;
		return 0;
	}

	int a[8] = { 2, 3, 4, 5, 6, 7, 8, 9 };
	int nums[8] = { 0, 0, 0, 0, 0, 0, 0, 0 };
	
	for (int i = 7; i >= 0; i--) {
		while (n % a[i] == 0) {
			nums[i]++;
			n /= a[i];
		}
	}

	if (n > 1) {
		cout << -1;

		return 0;
	}

	string s = "";

	for (int i = 0; i < 8; i++) {
		s = s + string(nums[i], to_string(a[i])[0]);
	}

	cout << s;

	return 0;
}