const APIUtil = require('./api_util');

class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options.userId;
    this.followState = (this.$el.data('2') || options.followState);
    
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
   }
  
 
   render() {
    switch (this.followState) {
      case 'followed':
        this.$el.prop('disabled', false);
        this.$el.html('Unfollow!');
        break;
      case 'unfollowed':
        this.$el.prop('disabled', false);
        this.$el.html('Follow!');
        break;
      case 'following':
        this.$el.prop('disabled', true);
        this.$el.html('Following...');
        break;
      case 'unfollowing':
        this.$el.prop('disabled', true);
        this.$el.html('Unfollowing...');
        break;
      }
    }
    
    handleClick (event) {
      preventDefault();
      if (this.followState === 'followed') {
        this.followState = 'unfollowing';
        this.render();
        APIUtil.unfollowUser(this.userId).then(() => {
            followToggle.followState = 'unfollowed';
            followToggle.render();
          });
        } if (this.followState === 'unfollowed') {
          this.followState = 'following';
          this.render();
          APIUtil.followUser(this.userId).then(() => {
            followToggle.followState = 'followed';
            followToggle.render();
            });
          }
        }
  }

module.exports = FollowToggle;
