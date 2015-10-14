MyAppExporter = {
  exportAllPosts: function(data) {
    // remove _id from export data
    var results = []
    var posts = data.posts;

    for(var i = 0; i < posts.length; i++) {
      var currentPost = {};
      var currentKey;
      if(posts[i]._id) {
        delete(posts[i]._id);
      };

      for (var key in posts[i]) {
        currentKey = MyAppExporter.toTitleCase(key)
        currentPost[currentKey] = posts[i][key]
      };


      results.push(currentPost);
    }

    var self = this;
    var csv = Papa.unparse(results);

    self._downloadCSV(csv);
  },
  _downloadCSV: function(csv) {
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
      a.download = "posts.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  },
  toTitleCase: function(str) {
    var words = str.split(/(?=[A-Z])/);
    words[0] = words[0][0].toUpperCase() + words[0].slice(1, words[0].length + 1);

    return words.join(' ');
  }
}

