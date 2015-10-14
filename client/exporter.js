MyAppExporter = {
  exportAllPosts: function(data) {
    debugger;
    var self = this;
    var csv = Papa.unparse(data.posts);

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
  }
}
