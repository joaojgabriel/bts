import Node from "./Node.js";

class Tree {
  constructor(arr) {
    this.root = build(arr);
  }

	#ins(n, v) {
		if (n.value >= v) {
			if (n.left) {
				return this.#ins(n.left, v);
			}
			n.left = new Node(v);
			return n.left;
		}
		if (n.right) {
			return this.#ins(n.right, v); 
		}
		n.right = new Node(v);
		return n.right;
	}

	insert(value) {
		return this.#ins(this.root, value)
	}

	#del(n, v) {
		if (n.left?.value === v) {
			if (!n.left.left && !n.left.right) {
				n.left = null;
				return v;
			}

			if (n.left.left && n.left.right) {
				let curr = n.left.left;
				while (curr.right.right) {
					curr = curr.right;
				}
				n.left.value = curr.right.value;
				curr.right = null;
				return n.left;
			}

			if (n.left.left) n.left = n.left.left;
			else n.left = n.left.right;

			return n.left;
		}

		if (n.right?.value === v) {
			if (!n.right.left && !n.right.right) {
				n.right = null;
				return v;
			}

			if (n.left.left && n.left.right) {
				let curr = n.right.left;
				while (curr.right.right) {
					curr = curr.right;
				}
				n.right.value = curr.right.value;
				curr.right = null;
				return n.right;
			}

			if (n.right.left) n.right = n.right.left;
			else n.right = n.right.right;
			
			return n.right;
		}

		if (n.left?.value > v) {
			return this.#del(n.left, v);
		}
		if (n.right?.value < v) return this.#del(n.right, v);
	}

	delete(value) {
		return this.#del(this.root, value);
	}
}

const mergeSort = (arr) => {
  const len = arr.length;

  if (len < 2) return arr;

  const mid = Math.floor(len / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

	const sorted = [];
  for (let i = 0; i < len; ++i) {
    if (i >= mid) {
      if (!left.length) return sorted.concat(right);
      if (!right.length) return sorted.concat(left);
    }
    Math.min(left[0], right[0]) === left[0]
      ? sorted.push(left.shift())
      : sorted.push(right.shift());
  }
};

const buildAux = (lo, hi, arr) => {
  if (lo > hi) return null;

  const mid = Math.floor((lo + hi) / 2);
  const root = new Node(arr[mid]);
  root.left = buildAux(lo, mid - 1, arr);
  root.right = buildAux(mid + 1, hi, arr);

  return root;
};

const build = (arr) => buildAux(0, arr.length - 1, mergeSort(arr));

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);
tree.insert(0x45);
tree.insert(42);
tree.insert(2);
tree.insert(4);
tree.delete(23);
tree.delete(1234);
prettyPrint(tree.root);
