Template.hotvideos.helpers({
  hotVideos: function () {
    return Videos.find({ source: 'chainByHot', "json.hide": {$ne: 1} }).fetch()
  }
})

Template.hotvideos.rendered = function () {
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
      Videos.getVideosBy('hot', 50, function(err, end){
        loading = false
        if (err) console.log(err)
        if (end) {
          finished = true
          $('.ui.infinite .loader').hide()
        } else {
          $('.ui.infinite .loader').hide()
        }
      })
    }
  });
}
