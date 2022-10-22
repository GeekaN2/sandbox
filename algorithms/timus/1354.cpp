#include <iostream>
#include <algorithm>
#include <vector>
#include <cmath>
#include <string>

using namespace std;

vector<int> prefixFunction(string s) {
    int n = s.size();

    vector<int> pi(n);

    for (int i = 1; i < n; ++i) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) j = pi[j - 1];
        if (s[i] == s[j])  ++j;
        pi[i] = j;
    }
    return pi;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);

    string s1;
    int j = 0;

    cin >> s1;

    string s2 = s1;
    reverse(s2.begin(), s2.end());

    vector<int> pi = prefixFunction(s1);

    for (int i = 0; i < s1.size(); i++) {
        while (j > 0 && s1[i] != s2[j]) j = pi[j - 1];
        if (s1[i] == s2[j]) j++;
        if (j == s1.size()) j = pi[j - 1];
    }

    cout << s1;
    for (int i = 0; i < s1.size() - j; i++) cout << s2[i + j];

    return 0;
}