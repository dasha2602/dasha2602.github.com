jQuery(document).ready(function () {

    "use strict";

    VK.init({apiId: 3899516});

    $('#vk_login').on('click', function () {
        doLogin();
    });
    $('#vk_logout').on('click', function () {
        doLogout();
    });

    VK.Observer.subscribe('auth.login', function (response) {
        getInitData();
    });

    VK.Observer.subscribe('auth.logout', function() {
        $('.start-panel').show();
        $('.main-panel').hide();
        $('.friends').hide();
        $('.temp').show();
    });

    $('#btnGlitch').on('click', function() {
        $(document).glitch();
    });

});

function getInitData() {
    var code;
    code = 'return {';
    code += 'me: API.getProfiles({uids: API.getVariable({key: 1280}), fields: "photo"})[0]';
    code += ',friends: API.getProfiles({uids: API.friends.get(), fields: "photo_big"})';
    //code += ',friends: API.getProfiles({uids: API.getAppFriends(), fields: "photo"})';
    code += ',status: API.isAppUser()';
    code += '};';
    VK.Api.call('execute', {'code': code}, onGetInitData);
}

function onGetInitData(data) {
    var r, i, j, html;
    if (data.response) {
        r = data.response;

        $('.start-panel').hide();
        $('.main-panel').show();
        $('.friends').show();
        $('.temp').hide();

        //console.log(data);
        //console.log(r.status);
        if (r.me) {
            $('#userName').text(r.me.first_name + ' ' + r.me.last_name);
        }

        /* Insert friends */

        var listFriends = '';
        //j = r.friends.length;
        for (i = 0, j = 20; i < j; i++) {
            //if (i >= 12) break;
            listFriends += '<div class="friends__item">' +
                '<div class="friends__item__i">' +
               '<a href="http://vk.com/id'+r.friends[i]['uid']+'">' +
                '<div class="friends__item__image"><img class="photo" src="'+r.friends[i]['photo_big']+'"></div>' +
               '</a>' +
                '</div>' +
                '</div>';
        }
        $('.friends__list').append(listFriends);

    } else {

    }
}

function doLogin() {
    VK.Auth.login(
        null,
        VK.access.FRIENDS
    );
}

function doLogout() {
    VK.Auth.logout();
}