#include <iostream>
#include <algorithm>
#include <vector>
#include <cmath>
#include <string>

using namespace std;

vector<vector<long long>> stairs(501, vector<long long>(501, -1));

long long calc(int i, int j) {
    if (i == 0) {
        return 1;
    }
    if (j == 0) {
        return 0;
    }

    long long ans = stairs[i][j];

    if (stairs[i][j] == -1) {
        ans = calc(i, j - 1);

        if (i >= j) {
            ans += calc(i - j, j - 1);
        }
    }

    stairs[i][j] = ans;

    return ans;
}


int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    cout << calc(n, n - 1);

    return 0;
}
