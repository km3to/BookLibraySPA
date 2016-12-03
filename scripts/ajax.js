function listAds() {
    $('#ads').empty()
    showView('viewAds')

    $.ajax({
        method: 'GET',
        url: `${kinveyBaseUrl}appdata/${appKey}/ads`,
        headers: { 'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
        success: loadAdsSuccess,
        error: handleAjaxError
    })

    function loadAdsSuccess(ads) {
        showInfo('Ads loaded.');
        if (ads.length == 0) {
            $('#ads').text('No ads in the library.');
        } else {
            let adsTable = $('<table>')
                .append($('<tr>').append(
                    '<th>Title</th><th>Publisher</th>',
                    '<th>Description</th><th>Price</th><th>Date Published</th><th>Actions</th>'));
            for (let ad of ads)
                appendAdRow(ad, adsTable);
            $('#ads').append(adsTable);
        }

        function appendAdRow(ad, adsTable) {
            let links = [];
            if (ad._acl.creator == sessionStorage['userId']) {
                let deleteLink = $('<a href="#">[Delete]</a>')
                    .click(function () { deleteAd(ad) });
                let editLink = $('<a href="#">[Edit]</a>')
                    .click(function () { loadAdForEdit(ad) });
                links = [deleteLink, ' ', editLink];
            }

            adsTable.append($('<tr>').append(
                $('<td>').text(ad.title),
                $('<td>').text(ad.publisher),
                $('<td>').text(ad.description),
                $('<td>').text(ad.price),
                $('<td>').text(ad.date),
                $('<td>').append(links)
            ));
        }
    }
}

function createAd() {
    let adData = {
        title: $('#formCreateAd input[name=title]').val(),
        publisher: sessionStorage.getItem('username'),
        description: $('#formCreateAd textarea[name=description]').val(),
        price: Math.round(Number($('#formCreateAd input[name=price]').val()) * 100) / 100,
        date: $('#formCreateAd input[name=datePublished]').val()
    }

    $.ajax({
        method: 'POST',
        url: `${kinveyBaseUrl}appdata/${appKey}/ads`,
        headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken') },
        data: adData,
        success: createAdSucces,
        error: handleAjaxError
    })

    function createAdSucces(response) {
        listAds()
        showInfo('Book Created.')
    }
}

function loadAdForEdit(ad) {
    $.ajax({
        method: 'GET',
        url: `${kinveyBaseUrl}appdata/${appKey}/ads/${ad._id}`,
        headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken') },
        success: loadAdForEditSucces,
        error: handleAjaxError
    })

    function loadAdForEditSucces(ad) {
        $('#formEditAd input[name=id]').val(ad._id)
        $('#formEditAd input[name=title]').val(ad.title)
        $('#formEditAd textarea[name=description]').val(ad.description)
        $('#formEditAd input[name=datePublished]').val(ad.date)
        $('#formEditAd input[name=price]').val(ad.price)

        showView('viewEditAd')
    }
}

function editAd() {
    let adData = {
        title: $('#formEditAd input[name=title]').val(),
        publisher: sessionStorage.getItem('username'),
        description: $('#formEditAd textarea[name=description]').val(),
        price: Math.round(Number($('#formEditAd input[name=price]').val()) * 100) / 100,
        date: $('#formEditAd input[name=datePublished]').val()
    }

    $.ajax({
        method: 'PUT',
        url: `${kinveyBaseUrl}appdata/${appKey}/ads/${$('#formEditAd input[name=id]').val()}`,
        headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken') },
        data: adData,
        success: editBookSuccess,
        error: handleAjaxError
    })

    function editBookSuccess(response) {
        listAds()
        showInfo('Ad edited.')
    }
}

function deleteAd(ad) {
    // TODO: Implement confirm delete feature
    $.ajax({
        method: 'DELETE',
        url: `${kinveyBaseUrl}appdata/${appKey}/ads/${ad._id}`,
        headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken') },
        success: deleteAdSuccess,
        error: handleAjaxError
    })

    function deleteAdSuccess(response) {
        listAds()
        showInfo('Ad deleted.')
    }
}