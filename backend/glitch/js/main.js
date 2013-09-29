jQuery(document).ready(function () {

    "use strict";

    var baseURL = window.location.toString();

    console.log('baseURL: ' + baseURL);
    console.log('hostname: ' + window.location.toString());
    console.log('search: ' + window.location.search);

    VK.init({apiId: 3899516});

    $('#vk_login').on('click', function () {
        doLogin();
    });
    $('#vk_logout').on('click', function () {
        doLogout();
    });

//    VK.Auth.getLoginStatus(function(response) {
//        if (response.session) {
//            //window.location = baseURL + '?op=main&page=auth';
//            console.log('it is ok');
//            getInitData();
//        } else {
//            VK.UI.button('vk_login');
//        }
//    });

    VK.Observer.subscribe('auth.login', function (response) {
        //window.location = '?op=main&page=auth';
        console.log('login');
        getInitData();

        // var user = API.getProfiles({uids: API.getVariable({key: 1280})});
        //var user = API.isAppUser();

//        console.log(response.me.first_name + ' ' + response.me.last_name);

//        $('#userName').text(response.me.first_name + ' ' + response.me.last_name);

        //$('.friends').append('<p>' + user + '</p>');
    });

    VK.Observer.subscribe('auth.logout', function() {
        console.log('logout');
        $('.login').show();
        $('.friends').hide();
    });

//    VK.Auth.getLoginStatus(function(response) {
//        if (response.session) {
//            //window.location = baseURL + '?op=main&page=auth';
//            console.log('it is ok');
//        } else {
//            VK.UI.button('vk_login');
//        }
//    });
//    VK.Observer.subscribe('auth.login', function(response) {
//        window.location = '?op=main&page=auth';
//    });
//    VK.Observer.subscribe('auth.statusChange', function(response) {
//        //console.log('statusChange');
//    });
//    VK.Observer.subscribe('auth.sessionChange', function(r) {
//        //console.log('sessionChange');
//    });

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

        $('.login').hide();
        $('.friends').show();

        /* Insert user info */
        console.log(data);
        console.log(r.status);

        if (r.me) {
            $('#userName').text(r.me.first_name + ' ' + r.me.last_name);
        }

        /* Insert friends */

        var listFriends = '';
        for (i = 0, j = r.friends.length; i < j; i++) {
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