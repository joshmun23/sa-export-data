Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('posts', {
    path: '/'
  })
  // this.route('post', {path: 'contact/:_id'})
});
