$(pageInit);

function pageInit(){

  function initialize() {
    var myLatlng = new google.maps.LatLng(47.014454,28.852415);
    var mapOptions = {
      zoom: 15,
      center: myLatlng,
      disableDefaultUI: true,
      scrollwheel: false
    }
    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Stele'
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);

}