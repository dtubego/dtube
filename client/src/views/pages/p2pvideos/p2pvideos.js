var moment = require('moment')

Template.p2pvideos.helpers({
  p2pVideos: function () {
    return Videos.find({ source: 'p2pvideos', "json.hide": {$ne: 1} }).fetch()
  }
})

Template.p2pvideos.rendered = function () {
  $('.ui.infinite')
    .visibility({
      once: false,
      observeChanges: true,
      onBottomVisible: function () {
        $('.ui.infinite .loader').show()
        Videos.getVideosBy('p2pvideos', 50, function (err) {
          if (err) console.log(err)
          $('.ui.infinite .loader').hide()
        })
      }
    });
}
