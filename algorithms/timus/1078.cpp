#include <iostream>
#include <algorithm>
#include <vector>
#include <cmath>

using namespace std;

struct segment {
    int l;
    int r;
    int i;
    int d{ 1 };
    int si{ -1 };
};

bool cmp(segment a, segment b) {
    return a.r - a.l > b.r - b.l;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    if (n == 0) {
        cout << "0\n";

        return 0;
    }

    vector<segment> a(n);

    int l, r;
    int mxDepth = 1;
    int mxi = -1;

    for (int i = 0; i < n; i++) {
        segment q;

        cin >> q.l >> q.r;
        q.i = i;

        a[i] = q;
    }

    sort(a.begin(), a.end(), cmp);

    for (int i = 0; i < n; i++) {
        int depth = 0;

        for (int j = 0; j < i; j++) {
            if (a[i].l > a[j].l && a[i].r < a[j].r && a[j].d > depth - 1) {
                depth = a[j].d + 1;
                a[i].d = depth;
                a[i].si = j;

                if (depth > mxDepth) {
                    mxDepth = depth;
                    mxi = i;
                }
            }
        }
    }

    cout << mxDepth << "\n";

    if (mxi == -1) {
        cout << "1\n";

        return 0;
    }

    for (int i = mxi; i != -1; i = a[i].si) {
        cout << a[i].i + 1 << " ";
    }

    cout << "\n";

    return 0;
}
