const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require("../extensions/list-tree.js");

class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.treeRoot) return (this.treeRoot = newNode), this;
    let current = this.treeRoot;
    while (current) {
      if (data === current.data) return;
      current =
        data < current.data
          ? current.left || (current.left = newNode)
          : current.right || (current.right = newNode);
    }
    return this;
  }

  has(data) {
    return search(this.treeRoot, data);
    function search(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return data < node.data
        ? search(node.left, data)
        : search(node.right, data);
    }
  }

  find(data) {
    let current = this.treeRoot;
    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    const del = (node, data) => {
      if (!node) return null;
      if (data < node.data) {
        node.left = del(node.left, data);
      } else if (node.data < data) {
        node.right = del(node.right, data);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let minFromRight = node.right;
        while (minFromRight.left) minFromRight = minFromRight.left;
        node.data = minFromRight.data;
        node.right = del(node.right, minFromRight.data);
      }
      return node;
    };
    this.treeRoot = del(this.treeRoot, data);
  }

  min() {
    let node = this.treeRoot;
    while (node?.left) node = node.left;
    return node?.data;
  }

  max() {
    let node = this.treeRoot;
    while (node?.right) node = node.right;
    return node?.data;
  }
}

module.exports = {
  BinarySearchTree,
};
