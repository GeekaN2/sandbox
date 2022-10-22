#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

void dfs(vector<vector<pair<int, int>>>& a, vector<bool>& used, vector<int>& height, vector<int>& order, vector<int>& distance, vector<int>& parent, int v, int h) {
	used[v] = true;
	height[v] = h;
	order.push_back(v);

	for (int i = 0; i < a[v].size(); i++) {
		if (!used[a[v][i].first]) {
			parent[a[v][i].first] = v;
			distance[a[v][i].first] = distance[v] + a[v][i].second;

			dfs(a, used, height, order, distance, parent, a[v][i].first, h + 1);
			order.push_back(v);
		}
	}
}

void shortDfs(vector<vector<pair<int, int>>>& a, vector<bool>& used, vector<int>& height, int v, int h) {
	used[v] = true;
	height[v] = h;

	for (int i = 0; i < a[v].size(); i++) {
		if (!used[a[v][i].first]) {
			shortDfs(a, used, height, a[v][i].first, h + 1);
		}
	}
}

struct farthestVertexes {
	int v1;
	int v2;
	int d;
};

farthestVertexes getFarthestVertexes(vector<vector<pair<int, int>>>& a) {
	vector<bool> used(a.size(), false);
	vector<int> height(a.size(), 0);

	shortDfs(a, used, height, 0, 0);

	int v1 = distance(height.begin(), max_element(height.begin(), height.end()));

	used.assign(a.size(), false);
	height.assign(a.size(), 0);

	shortDfs(a, used, height, v1, 0);

	int v2 = distance(height.begin(), max_element(height.begin(), height.end()));

	farthestVertexes ans;

	ans.v1 = v1;
	ans.v2 = v2;
	ans.d = *max_element(height.begin(), height.end());

	return ans;
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
	else if (l > sm) {
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

int dist(vector<int>& distance, int v1, int v2, int laca) {
	return abs(distance[v1] + distance[v2] - 2 * distance[laca]);
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0);

	int n, m;

	cin >> n >> m;

	vector<vector<pair<int, int>>> a(n);
	vector<int> height(n);
	vector<int> order;
	vector<int> first(n, -1);
	vector<bool> used(n, false);
	vector<int> tree;
	vector<int> distance(n, 0);
	vector<int> parent(n, -1);

	for (int i = 0; i < n - 1; i++) {
		int from, to;

		cin >> from >> to;
		from--;
		to--;

		a[from].push_back(make_pair(to, 1));
		a[to].push_back(make_pair(from, 1));
	}

	distance[0] = 0;
	farthestVertexes farthestVertexes = getFarthestVertexes(a);

	dfs(a, used, height, order, distance, parent, 0, 1);

	tree.assign(order.size() * 4 + 1, -1);

	build(tree, order, height, 1, 0, order.size() - 1);

	for (int i = 0; i < order.size(); i++) {
		int v = order[i];

		if (first[v] == -1) {
			first[v] = i;
		}
	}

	for (int i = 0; i < m; i++) {
		int from, d, farthestNode = 0;

		cin >> from >> d;
		from--;

		int l1 = lca(tree, first, height, order, from, farthestVertexes.v1);
		int l2 = lca(tree, first, height, order, from, farthestVertexes.v2);
		int anc;
		int d1 = dist(distance, from, farthestVertexes.v1, l1);
		int d2 = dist(distance, from, farthestVertexes.v2, l2);
		int d3 = 0;

		if (d1 > d2) {
			farthestNode = farthestVertexes.v1;
			d3 = d1;
			anc = l1;
		}
		else {
			farthestNode = farthestVertexes.v2;
			d3 = d2;
			anc = l2;
		}

		if (d3 < d) {
			cout << 0 << "\n";

			continue;
		}

		int d4 = dist(distance, from, anc, anc);
		int d5 = dist(distance, farthestNode, anc, anc);

		if (d4 < d) {
			int th = d5 - (d - d4);

			for (int i = 0; i < th; i++) {
				farthestNode = parent[farthestNode];
			}

			cout << farthestNode + 1 << "\n";
		}
		else {
			int th = d;

			for (int i = 0; i < th; i++) {
				from = parent[from];
			}

			cout << from + 1 << "\n";
		}
	}

	return 0;
}