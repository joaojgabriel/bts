import Node from "./Node.js";

class Tree {
	constructor(arr=null) {
		if (!arr) {
			this.root = build(createRandomArr(arr));
		} else {
			this.root = build(arr);
		}
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

	#f(n, v) {
		if (!n) return undefined;
		if (n.value === v) return n;
		return n.value > v 
			? this.#f(n.left, v)
		  : this.#f(n.right, v);
	}

	find(value) {
		return this.#f(this.root, value);
	}

	levelOrder(callbackFn) {
		const q = [this.root];
		const arr = [];

		while (q.length) {
			const curr = q.shift()
			if (!curr) continue;

			callbackFn 
				? arr.push(callbackFn(curr.value))
				: arr.push(curr.value);

			q.push(curr.left);
			q.push(curr.right);
		}

		return arr;
	}

	#pre(curr, path) {
		if (!curr) return path;
		
		path.push(curr.value);
		this.#pre(curr.left, path);
		this.#pre(curr.right, path);

		return path;
	}

	preorder() {
		return this.#pre(this.root, []);
	}

	#in(curr, path) {
		if (!curr) return path;
		
		this.#in(curr.left, path);
		path.push(curr.value);
		this.#in(curr.right, path);

		return path;
	}

	inorder() {
		return this.#in(this.root, []);
	}

	#post(curr, path) {
		if (!curr) return path;
		
		this.#post(curr.left, path);
		this.#post(curr.right, path);
		path.push(curr.value);

		return path;
	}

	postorder() {
		return this.#post(this.root, []);
	}

	#hi(curr, h) {
		if (!curr) return h;

		return Math.max(this.#hi(curr.left, h + 1), this.#hi(curr.right, h + 1))
	}

	height(node) {
		return this.#hi(node, 0);
	}

	#deep(n, curr, d) {
		if (!curr) return undefined;
		if (curr === n) return d;
		if (curr.value > n.value) {
			return this.#deep(n, curr.left, d + 1);
		}
		return this.#deep(n, curr.right, d + 1);
	}

	depth(node) {
		return this.#deep(node, this.root, 0);
	}

	#balanced(curr) {
		if (!curr) return true;
		return (
			(this.height(curr.left) - this.height(curr.right)) < 2 
			&& this.#balanced(curr.left) && this.#balanced(curr.right) 
		)
	}
	isBalanced() {
		return this.#balanced(this.root);
	}

	rebalance() {
		this.root = build(this.inorder());
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

const createRandomArr = () => {
	const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	for (let i = 0; i < 15; ++i) {
		arr[i] = Math.floor(Math.random() * 50);
	}
	return arr
}

const tree = new Tree(); 
prettyPrint(tree.root);
console.log('is it balanced?', tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());
tree.insert(Math.floor(200 * Math.random()))
tree.insert(Math.floor(200 * Math.random()))
tree.insert(Math.floor(200 * Math.random()))
tree.insert(Math.floor(200 * Math.random()))
tree.insert(Math.floor(200 * Math.random()))
tree.insert(Math.floor(200 * Math.random()))
prettyPrint(tree.root);
console.log('before balancing:', tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);
console.log('after balancing:', tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());
