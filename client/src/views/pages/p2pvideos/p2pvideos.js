var moment = require('moment')

Template.p2pvideos.helpers({
  p2pVideos: function () {
    return Videos.find({ source: 'p2pvideos', "json.hide": {$ne: 1} }).fetch()
  }
})

Template.p2pvideos.rendered = function () {
  var loading = false
  var finished = false
  $('.ui.infinite')
    .visibility({
      once: false,
      observeChanges: true,
      onBottomVisible: function () {
        if (loading || finished) return
        loading = true
        $('.ui.infinite .loader').show()
        Videos.getVideosBy('p2pvideos', 50, function (err, end) {
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
