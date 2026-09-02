Template.newvideos.helpers({
  newVideos: function () {
    return Videos.find({ source: 'chainByCreated', "json.hide": {$ne: 1} }).fetch()
  }
})

Template.newvideos.rendered = function () {
  var loading = false
  var finished = false
  var lastCursor = null
  $('.ui.infinite')
    .visibility({
      once: false,
      observeChanges: true,
      onBottomVisible: function () {
        if (loading || finished) return
        loading = true
        var cursor = Session.get('lastCreated')
        if (cursor && lastCursor && cursor.author === lastCursor.author && cursor.link === lastCursor.link) {
          // Same cursor as the previous request: the API returned nothing new
          // (or everything was filtered out). Stop refetching to avoid freezing
          // the page with an endless loop.
          loading = false
          finished = true
          $('.ui.infinite .loader').hide()
          return
        }
        lastCursor = cursor
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
