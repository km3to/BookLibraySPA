function startApp() {


    sessionStorage.clear()
    showHideMenuLinks()
    showView('viewHome')

    // Bind the navigation menu links
    $('#linkHome').click(showHomeView)
    $('#linkLogin').click(showLoginView)
    $('#linkRegister').click(showRegisterView)
    $('#linkListAds').click(showListAdsView)
    $('#linkCreateAd').click(showCreateAdView)
    $('#linkLogout').click(logoutUser)

    // Bind the form submit buttons
    $('#buttonLoginUser').click(loginUser)
    $('#buttonRegisterUser').click(registerUser)
    $('#buttonCreateAd').click(createAd)
    $('#buttonEditAd').click(editAd)

    // Bind the info / error boxes: hide on click
    $("#infoBox, #errorBox").click(function() {
        $(this).fadeOut();
    })

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }
    })
}