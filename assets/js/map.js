/**
 * Created by Bruno on 05/03/2017.
 */
var map;
var marker;
var address = "Nando's, Baker Street, Londres, Reino Unido";

function initMap() {
    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        rotateControl: false
    });

    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon: './assets/images/marker.png'
            });
        }
    });
}
