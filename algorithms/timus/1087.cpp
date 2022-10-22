#include <iostream>
#include <algorithm>
#include <vector>
#include <cmath>
#include <string>

using namespace std;

int main() {
    int n, m;

    cin >> n >> m;

    vector<int> a(n + 1, 2);
    vector<int> k(m);

    for (int i = 0; i < m; i++) cin >> k[i];
    
    a[0] = 1;

    for (int i = 1; i <= n; i++)
        for (int j = 0; j < m; j++)
            if (i - k[j] >= 0 && a[i - k[j]] == 2) 
                a[i] = 1;

    cout << a[n];

    return 0;
}