function showHideMenuLinks() {
    $("#linkHome").show()
    if(sessionStorage.getItem('authToken')) {
        // User is logged in
        $("#linkLogin").hide()
        $("#linkRegister").hide()
        $("#linkListAds").show()
        $("#linkCreateAd").show()
        $("#linkLogout").show()

    } else {
        // Not logged in
        $("#linkLogin").show()
        $("#linkRegister").show()
        $("#linkListAds").show()
        $("#linkCreateAd").hide()
        $("#linkLogout").hide()
    }
}

function showView(viewName) {
    // Hide all views and show the selected view only
    $('main > section').hide();
    $('#' + viewName).show();
}

function showHomeView() {
    showView('viewHome')
}

function showLoginView() {
    showView('viewLogin')
    $('#formLogin').trigger('reset')
}

function showRegisterView() {
    $('#formRegister').trigger('reset')
    showView('viewRegister')
}

function showListAdsView() {
    showView('viewAds')
}

function showCreateAdView() {
    $('#formCreateAd').trigger('reset')
    showView('viewCreateAd')
}