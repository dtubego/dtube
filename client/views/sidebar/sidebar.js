Template.sidebar.rendered = function() {
    Template.settingsdropdown.nightMode();
    Template.sidebar.selectMenu();
}

Template.sidebar.events({
    'click .dtubesidebarmenu': function() {
        if (/Mobi/.test(navigator.userAgent)) {
            Template.sidebar.empty()
        } else {
            Template.sidebar.half()
        }
    },
})

Template.sidebar.helpers({
    version: () => {
        return Version.findOne({});
    },
    versionShortCommit: () => {
        return Version.findOne({}).commit.substring(0,5);
    }
});

Template.sidebar.resetActiveMenu = function() {
    $('#homesidebarmenu').removeClass('activemenu')
    $('#channelsidebarmenu').removeClass('activemenu')
    $('#feedsidebarmenu').removeClass('activemenu')
    $('#trendingsidebarmenu').removeClass('activemenu')
    $('#watchagainsidebarmenu').removeClass('activemenu')
    $('#uploadsidebarmenu').removeClass('activemenu')
    $('#hotsidebarmenu').removeClass('activemenu')
    $('#newsidebarmenu').removeClass('activemenu')
    $('#watchlatersidebarmenu').removeClass('activemenu')
    $('#golivesidebarmenu').removeClass('activemenu')
    $('#livesidebarmenu').removeClass('activemenu')
    $('#electionsidebarmenu').removeClass('activemenu')
    $('#settingssidebarmenu').removeClass('activemenu')
    $('#helpsidebarmenu').removeClass('activemenu')
    Template.settingsdropdown.nightMode();
}

Template.sidebar.selectMenu = function() {
    Template.sidebar.resetActiveMenu()
    switch (Session.get('currentMenu')) {
        case 1:
            $('#homesidebarmenu').addClass('activemenu')
            break;
        case 2:
            $('#channelsidebarmenu').addClass('activemenu')
            break;
        case 3:
            $('#uploadsidebarmenu').addClass('activemenu')
            break;
        case 4:
            $('#hotsidebarmenu').addClass('activemenu')
            break;
        case 5:
            $('#trendingsidebarmenu').addClass('activemenu')
            break;
        case 6:
            $('#newsidebarmenu').addClass('activemenu')
            break;
        case 7:
            $('#watchlatersidebarmenu').addClass('activemenu')
            break;
        case 8:
            $('#watchagainsidebarmenu').addClass('activemenu')
            break;
        case 9:
            $('#golivesidebarmenu').addClass('activemenu')
            break;
        case 10:
            $('#livesidebarmenu').addClass('activemenu')
            break;
        case 11:
            $('#dtalksidebarmenu').addClass('activemenu')
            break;
        case 12:
            $('#electionsidebarmenu').addClass('activemenu')
            break;
        case 13:
            $('#settingssidebarmenu').addClass('activemenu')
            break
        case 14:
            $('#helpsidebarmenu').addClass('activemenu')
            break
        case 15:
            $('#feedsidebarmenu').addClass('activemenu')
        case 16:
            $('#p2pvideosbarmenu').addClass('activemenu')
        default:
            break;
    }
}

Template.sidebar.half = function() {
    $("#sidebar")
        .sidebar('setting', 'dimPage', false)
        .sidebar('setting', 'closable', true)
        .sidebar('show')
    $('.article').css('--sidebar-shift', '212px').addClass('shifted')
}

Template.sidebar.full = function() {
    $("#sidebar")
        .sidebar('setting', 'dimPage', false)
        .sidebar('setting', 'closable', true)
        .sidebar('show')
    $('.article').css('--sidebar-shift', '212px').addClass('shifted')
}

Template.sidebar.empty = function() {
    $("#sidebar").sidebar('hide')
    $('.article').removeClass('shifted').css('--sidebar-shift', '0px')
}

Template.sidebar.mobile = function() {
    $("#sidebar")
        .sidebar('setting', 'dimPage', true)
        .sidebar('setting', 'closable', true)
        .sidebar('toggle')
    if ($('#sidebar').sidebar('is visible')) {
        $('.article').css('--sidebar-shift', '162px').addClass('shifted')
    } else {
        $('.article').removeClass('shifted').css('--sidebar-shift', '0px')
    }
}
