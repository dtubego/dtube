Template.sidebar.rendered = function() {
    Template.settingsdropdown.nightMode();
    Template.sidebar.selectMenu();
    
    // Ensure sidebar is initialized with the correct context to prevent topbar movement
    if (/Mobi/.test(navigator.userAgent)) {
        $("#sidebar")
            .sidebar('setting', 'context', '#sidebar-context')
            .sidebar('setting', 'detachable', false)
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('setting', 'dimPage', true)
            .sidebar('setting', 'closable', true);
    } else {
        // On desktop, initialize and show the sidebar (half state)
        Template.sidebar.half();
    }
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
    // Destroy existing sidebar to ensure clean state and correct context
    if ($("#sidebar").data('module-sidebar')) {
        $("#sidebar").sidebar('destroy');
    }
    
    // Ensure context exists, default to body if not found (though it should be there)
    var context = $('#sidebar-context').length > 0 ? '#sidebar-context' : 'body';
    
    $("#sidebar")
        .sidebar('setting', 'context', context)
        .sidebar('setting', 'detachable', false)
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'dimPage', false)
        .sidebar('setting', 'closable', true)
        .sidebar('setting', 'onChange', function() {
            // Manual check to toggle content shift class
            // We use a timeout to let the sidebar state update
            setTimeout(function() {
                if ($('#sidebar').sidebar('is visible')) {
                    $('.article').addClass('shifted');
                } else {
                    $('.article').removeClass('shifted');
                }
            }, 50);
        })
        .sidebar('show')
}

Template.sidebar.full = function() {
    if ($("#sidebar").data('module-sidebar')) {
        $("#sidebar").sidebar('destroy');
    }

    var context = $('#sidebar-context').length > 0 ? '#sidebar-context' : 'body';

    $("#sidebar")
        .sidebar('setting', 'context', context)
        .sidebar('setting', 'detachable', false)
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'dimPage', false)
        .sidebar('setting', 'closable', true)
        .sidebar('setting', 'onChange', function() {
            setTimeout(function() {
                if ($('#sidebar').sidebar('is visible')) {
                    $('.article').addClass('shifted');
                } else {
                    $('.article').removeClass('shifted');
                }
            }, 50);
        })
        .sidebar('show')
}

Template.sidebar.empty = function() {
    $("#sidebar").sidebar('hide')
    $('.article').removeClass('shifted');
}

Template.sidebar.mobile = function() {
    if ($("#sidebar").data('module-sidebar')) {
        $("#sidebar").sidebar('destroy');
    }

    $("#sidebar")
        .sidebar('setting', 'context', '#sidebar-context')
        .sidebar('setting', 'detachable', false)
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'dimPage', true)
        .sidebar('setting', 'closable', true)
        .sidebar('toggle')
}
