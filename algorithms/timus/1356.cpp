#include <iostream>
#include <algorithm>
#include <vector>
#include <cmath>
#include <string>

using namespace std;

bool primeCheck(int n) {
    for (int i = 2; i <= sqrt(n); i++)
        if (n % i == 0)
            return false;

    return true;
}

int main() {
    long long tests, n, ans;
    
    cin >> tests;

    for (; tests > 0; tests--) {
        cin >> n;

        if (primeCheck(n)) {
            cout << n << endl;
        }
        else  {
            ans = n - 3 > 2 ? n - 3 : n;

            if (n % 2 == 1) {
                ans = n - 2;
                while (!primeCheck(ans)) ans -= 2;
                cout << ans << " ";
                n -= ans;
                ans = n - 3 > 2 ? n - 3 : n;
            }

            while (!primeCheck(ans) || !primeCheck(n - ans)) ans -= 2;

            cout << ans << " ";
            
            if (n - ans != 0) {
                cout << n - ans;
            }

            cout << endl;
        }
    }
    return 0;
}