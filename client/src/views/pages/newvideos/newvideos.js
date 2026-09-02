Template.newvideos.helpers({
  newVideos: function () {
    return Videos.find({ source: 'chainByCreated', "json.hide": {$ne: 1} }).fetch()
  }
})

Template.newvideos.rendered = function () {
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
        Videos.getVideosBy('created', 50, function (err, end) {
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
