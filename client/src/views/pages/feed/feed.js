Template.feed.helpers({
    feedVideos: function () {
      return Videos.find({ source: 'chainByFeed-' + FlowRouter.getParam('username'), "json.hide": {$ne: 1} }).fetch()
    },
    username: function() {
      return FlowRouter.getParam('username')
    }
  })
  
  Template.feed.rendered = function () {
    var loading = false
    var finished = false
    $('.ui.infinite')
    .visibility({
      once: false,
      observeChanges: true,
      onBottomVisible: function() {
        if (loading || finished) return
        loading = true
        $('.ui.infinite .loader').show()
        Videos.loadFeed(FlowRouter.getParam('username'), false, function(err, end) {
            loading = false
            if (err) console.log(err)
            if (end) {
              finished = true
            }
            $('.ui.infinite .loader').hide()
        })
      }
    });
  }
  