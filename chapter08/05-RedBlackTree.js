function RedBlackTree() {

    var Colors = {
        RED: 0,
        BLACK: 1
    };

    var Node = function (key, color) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.color = color;

        this.flipColor = function(){
            if (this.color === Colors.RED) {
                this.color = Colors.BLACK;
            } else {
                this.color = Colors.RED;
            }
        };
    };

    var root = null;

    this.getRoot = function () {
        return root;
    };

    var isRed = function(node){
        if (!node){
            return false;
        }
        return node.color === Colors.RED;
    };

    var flipColors = function(node){
        node.left.flipColor();
        node.right.flipColor();
    };

    var rotateLeft = function(node){
        var temp = node.right;
        if (temp !== null) {
            node.right = temp.left;
            temp.left = node;
            temp.color = node.color;
            node.color = Colors.RED;
        }
        return temp;
    };

    var rotateRight = function (node) {
        var temp = node.left;
        if (temp !== null) {
            node.left = temp.right;
            temp.right = node;
            temp.color = node.color;
            node.color = Colors.RED;
        }
        return temp;
    };

    var insertNode = function(node, element) {

        if (node === null) {
            return new Node(element, Colors.RED);
        }

        var newRoot = node;

        if (element < node.key) {

            node.left = insertNode(node.left, element);

        } else if (element > node.key) {

            node.right = insertNode(node.right, element);

        } else {
            node.key = element;
        }

        if (isRed(node.right) && !isRed(node.left)) {
            newRoot = rotateLeft(node);
        }

        if (isRed(node.left) && isRed(node.left.left)) {
            newRoot = rotateRight(node);
        }
        if (isRed(node.left) && isRed(node.right)) {
            flipColors(node);
        }

        return newRoot;
    };

    this.insert = function(element) {
        root = insertNode(root, element);
        root.color = Colors.BLACK;
    };
}
