var $ = jQuery;
var map;
$(document).ready(function() {

    var easyPanel = $('#scotch-panel').scotchPanel({
        containerSelector: 'body',
        direction: 'right',
        duration: 300,
        distanceX: '50%',
        enableEscapeKey: true
    });

    $('.toggle-panel').click(function() {
        easyPanel.toggle();
        return false;
    });

    var position = $.getJSON('http://ipinfo.io', function(data) {
        pos = data.loc;
    }).success(function() {

        var i = pos.split(',');
        var lat = i[0]
        var lon = i[1]

        var map = new GMaps({
            div: '#map',
            lat: lat,
            lng: lon,
        });

        map.addMarker({
            lat: lat,
            lng: lon,
        })

        var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '35&lon=' + lon + '&appid=18c2d4d8af4cef4165b8fb0d389730ce&units=metric';

        var weather = $.getJSON(weatherUrl, function(data) {
        }).success(function(data) {
            var temp = data.main.temp; // get temp
            temp = Math.ceil(temp)

            var cond = data.weather; // get conditions
            var desc = cond[0].description; // take descriptions from condtions

            var wind = data.wind;
            var windSpeed = wind.speed;
            windSpeed = Math.ceil(windSpeed);

            $('#temp').append(temp + "&deg;C");
            $('#cond').append(desc);
            $('#wind').append(windSpeed + "mph");
        })
    });
});


// I had some trouble working out how to get the event listeners working
// with the video tags... :(
function getVideos() {
    var videos = document.getElementsByTagName('video');
    console.log(videos);
}

getVideos();
