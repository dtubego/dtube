import { DTubeVersion } from "/client/lib/version";

Template.sidebar.rendered = function() {
    Template.settingsdropdown.nightMode();
    Template.sidebar.selectMenu();

    if (/Mobi/.test(navigator.userAgent)) {
        $("#sidebar")
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('setting', 'dimPage', true)
            .sidebar('setting', 'closable', true)
            .sidebar('setting', 'duration', 300);
    } else {
        if (Session.get('sidebarOpen') === undefined) {
            Session.set('sidebarOpen', true);
        }

        this.autorun(() => {
            const open = Session.get('sidebarOpen');
            if (open) {
                Meteor.defer(() => Template.sidebar.half());
            } else {
                Template.sidebar.empty();
            }
        });
    }
}

Template.sidebar.helpers({
        shortCommit: () => {
            return DTubeVersion.commit.substring(0,7);
        }
});

Template.sidebar.events({
    'click .dtubesidebarmenu': function() {
        if (/Mobi/.test(navigator.userAgent)) {
            $("#sidebar").sidebar('hide')
        }
        // On desktop, we rely on the session state to keep it open.
        // No need to call half() which would re-initialize it.
    },
})

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
    $('#p2psidebarmenu').removeClass('activemenu')
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
        case 16:
            $('#p2psidebarmenu').addClass('activemenu')
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
        default:
            break;
    }
}

Template.sidebar.half = function() {
    $("#sidebar")
        .sidebar('setting', 'dimPage', false)
        .sidebar('setting', 'closable', true)
        .sidebar('setting', 'transition', 'push')
        .sidebar('setting', 'duration', 300)
        .sidebar('show')
}

Template.sidebar.full = function() {
    var $context = $('#sidebar');
    $("#sidebar")
        .sidebar('setting', 'context', $context)
        .sidebar('setting', 'detachable', false)
        .sidebar('setting', 'transition', 'push')
        .sidebar('setting', 'dimPage', false)
        .sidebar('setting', 'closable', true)
        .sidebar('setting', 'duration', 300)
        .sidebar('show')
}

Template.sidebar.empty = function() {
    $("#sidebar")
        .sidebar('setting', 'dimPage', false)
        .sidebar('setting', 'closable', true)
        .sidebar('setting', 'transition', 'push')
        .sidebar('setting', 'duration', 300)
        .sidebar('hide')
}

Template.sidebar.toggle = function() {
    if (Session.get('sidebarOpen') === undefined) {
        Session.set('sidebarOpen', true);
    }
    const open = Session.get('sidebarOpen');
    Session.set('sidebarOpen', !open);
    if (open) {
        Meteor.defer(() => Template.sidebar.half());
    } else {
        Template.sidebar.empty();
    }
}

Template.sidebar.mobile = function() {
    $("#sidebar").sidebar('toggle');
}
