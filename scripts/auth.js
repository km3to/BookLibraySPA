const kinveyBaseUrl = "https://baas.kinvey.com/"
const appKey = 'kid_rymHDOtMe'
const appSecret = '6b33c112c91c4beeacb7444fff89ca72'
const kinveyAuthHeaders = {
    'Authorization': "Basic " +
    btoa(appKey + ":" + appSecret)
}

function loginUser() {
    let userData = {
        username: $('#formLogin input[name=username]').val(),
        password: $('#formLogin input[name=passwd]').val()
    }
    $.ajax({
        method: 'POST',
        url: `${kinveyBaseUrl}user/${appKey}/login`,
        headers: kinveyAuthHeaders,
        data: userData,
        success: loginSuccess,
        error: handleAjaxError
    })

    function loginSuccess(userInfo) {
        saveAuthInSession(userInfo)
        showHideMenuLinks()
        listAds()
        showInfo('Login successful.')
    }
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
    sessionStorage.setItem('userId',  userInfo._id)
    sessionStorage.setItem('username', userInfo.username)
    $('#loggedInUser').text(`Welcome, ${userInfo.username}!`)
}

function registerUser() {
    let userData = {
        username: $('#formRegister input[name=username]').val(),
        password: $('#formRegister input[name=passwd]').val()
    }

    if(userData.username !== '' && userData.password !== '') {
        $.ajax({
            method: 'POST',
            url: `${kinveyBaseUrl}user/${appKey}/`,
            headers: kinveyAuthHeaders,
            data: userData,
            success: registerSuccess,
            error: handleAjaxError
        })
    }

    function registerSuccess(userInfo) {
        saveAuthInSession(userInfo)
        showHideMenuLinks()
        listAds()
        showInfo('User registration successful.')
    }
}

function logoutUser() {
    sessionStorage.clear()
    $('#loggedInUser').text('')
    showHideMenuLinks();
    showView('viewHome');
    showInfo('Logout successful.')
}