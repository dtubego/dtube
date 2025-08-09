
Template.verticalvideosnap.events({
  'click #remove': function () {
    WatchLater.remove(this._id)
    event.preventDefault()
  }
})

Template.verticalvideosnap.rendered = function () {
  $(this.firstNode.nextSibling).find('img').visibility({
    type       : 'image',
    transition : 'fade in',
    duration   : 1000
  })
  Template.settingsdropdown.nightMode();
 }

 Template.verticalvideosnap.helpers({
  isUserBlockedByActiveUser: function (username) {
    try {
      let rawBlockedUsersList = localStorage.getItem("blockedUsersList")
      if (rawBlockedUsersList === "") return false
      let blockedUsers = JSON.parse(rawBlockedUsersList)
      if (typeof blockedUsers !== 'object') return false;
      return blockedUsers.indexOf(username) > -1;
    } catch (e) {
      console.log(e.toString())
    }
  },
 })


