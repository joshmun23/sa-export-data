Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('posts', {
    path: '/',
    subscriptions: function(){
      return Meteor.subscribe("userPosts");
    }
  })
  // this.route('post', {path: 'contact/:_id'})
});
