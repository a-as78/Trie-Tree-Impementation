function TrieNode(key) {
    this.key = key;
    this.parent = null;
    this.children = {};
    this.end = false;

    this.getWord = function() {
    var output = [];
    var node = this;
    
    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }
    
    return output.join('');
  };
}
  function Trie() {
    this.root = new TrieNode(null);

    this.insert = function(word) {
    var node = this.root;

    for(var i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);
        node.children[word[i]].parent = node;
      }

      node = node.children[word[i]];
      //node.children.sort();

      if (i == word.length-1) {
        node.end = true;
      }
    }
  };
  
  this.contains = function(word) {
    var node = this.root;
    
    for(var i = 0; i < word.length; i++) {
      if (node.children[word[i]]) {
        node = node.children[word[i]];
      } else {
        return false;
      }
    }
    
    return node.end;
  };
  
  this.find = function(prefix) {
    var node = this.root;
    var output = [];
    
    for(var i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        return output;
      }
    }
    
    findAllWords(node, output);
    
    return output;
  };
}
  
  function findAllWords(node, arr) {

    if (node.end) {
      arr.unshift(node.getWord());
    }

    for (var child in node.children) {
      findAllWords(node.children[child], arr);
    }
  }
  
  var trie = new Trie();
  
  trie.insert("and");
  trie.insert("at");
  trie.insert("an");
  trie.insert("tan");


  console.log(trie.contains("and"));
  console.log(trie.contains("art"));
  console.log(trie.find("an"));
  console.log(trie.find("a"));