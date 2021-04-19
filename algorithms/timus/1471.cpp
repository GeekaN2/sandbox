#include <iostream>
#include <vector>

using namespace std;

void dfs(vector<vector<pair<int, int>>>& a, vector<bool>& used, vector<int>& height, vector<int>& order, vector<int>& distance, int v, int h) {
	used[v] = true;
	height[v] = h;
	order.push_back(v);

	for (int i = 0; i < a[v].size(); i++) {
		if (!used[a[v][i].first]) {
			distance[a[v][i].first] = distance[v] + a[v][i].second;

			dfs(a, used, height, order, distance, a[v][i].first, h + 1);
			order.push_back(v);
		}
	}
}

void build(vector<int>& tree, vector<int>& order, vector<int>& height, int i, int l, int r) {
	if (l == r) {
		tree[i] = order[l];
	}
	else {
		int m = (l + r) / 2;

		build(tree, order, height, i * 2, l, m);
		build(tree, order, height, i * 2 + 1, m + 1, r);

		if (height[tree[i * 2]] < height[tree[i * 2 + 1]]) {
			tree[i] = tree[i * 2];
		}
		else {
			tree[i] = tree[i * 2 + 1];
		}
	}
}

int minInTree(vector<int>& tree, vector<int>& height, int i, int sl, int sr, int l, int r) {
	if (sl == l && sr == r) {
		return tree[i];
	}

	int sm = (sl + sr) / 2;

	if (r <= sm) {
		return minInTree(tree, height, i * 2, sl, sm, l, r);
	}

	if (l > sm) {
		return minInTree(tree, height, i * 2 + 1, sm + 1, sr, l, r);
	}

	int ans1 = minInTree(tree, height, i * 2, sl, sm, l, sm);
	int ans2 = minInTree(tree, height, i * 2 + 1, sm + 1, sr, sm + 1, r);

	return height[ans1] < height[ans2] ? ans1 : ans2;
}

int lca(vector<int>& tree, vector<int>& first, vector<int>& height, vector<int>& order, int a, int b) {
	int left = first[a];
	int right = first[b];

	if (left > right) {
		swap(left, right);
	}

	return minInTree(tree, height, 1, 0, order.size() - 1, left, right);
}

int main() {
	int n, m;

	cin >> n;

	vector<vector<pair<int, int>>> a(n);
	vector<int> height(n);
	vector<int> order;
	vector<int> first(n, -1);
	vector<bool> used(n, false);
	vector<int> tree;
	vector<int> distance(n, 0);

	for (int i = 0; i < n - 1; i++) {
		int from, to, weight;

		cin >> from >> to >> weight;

		a[from].push_back(make_pair(to, weight));
		a[to].push_back(make_pair(from, weight));
	}

	distance[0] = 0;

	dfs(a, used, height, order, distance, 0, 1);

	tree.assign(order.size() * 4 + 1, -1);

	build(tree, order, height, 1, 0, order.size() - 1);

	for (int i = 0; i < order.size(); i++) {
		int v = order[i];

		if (first[v] == -1) {
			first[v] = i;
		}
	}

	cin >> m;

	for (int i = 0; i < m; i++) {
		int from, to;

		cin >> from >> to;

		cout << distance[from] + distance[to] - 2 * distance[lca(tree, first, height, order, from, to)] << endl;
	}

	return 0;
}