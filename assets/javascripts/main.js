DirectiveMaps = {
  MAPS: [
    { id: 'map-cha', lat: 38.578738, lng: -121.489891 },
    { id: 'map-cma', lat: 38.580044, lng: -121.490473 },
    { id: 'map-cc', lat: 38.806752, lng: -77.058199 },
    { id: 'map-cc', lat: 38.806752, lng: -77.058199 },
    { id: 'map-cedars', lat: 34.075482, lng: -118.380393 },
    { id: 'map-easy', lat: 33.928012, lng: -117.959818 },
    { id: 'map-five', lat: 30.436021, lng: -84.229167 },
    { id: 'map-knor', lat: 37.810211, lng: -122.263990 },
    { id: 'map-kso', lat: 37.810211, lng: -122.263990 },
    { id: 'map-pih', lat: 33.968859, lng: -118.048390 },
    { id: 'map-polst', lat: 38.608439, lng: -121.487269 },
    { id: 'map-probate', lat: 38.579908, lng: -121.488349 },
    { id: 'map-sharp', lat: 32.825495, lng: -117.140425 },
    { id: 'map-thinking', lat: 38.608439, lng: -121.487269 },
    { id: 'map-ucsf', lat: 37.763715, lng: -122.458699 }
  ],

  current_map: null,

  renderMap: function(id) {
    var map_id = 'map-' + id.replace('#', '')
    var mapCanvas = $('#' + map_id)[0]

    if ($(mapCanvas).html().length > 0) {
      return // No need to re-render if it already exists.
    }

    var map = this.getMap(map_id)
    var mapOptions = {
      center: new google.maps.LatLng(map.lat, map.lng),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    current_map = new google.maps.Map(mapCanvas, mapOptions)
  },

  getMap: function(map_id) {
    return $.grep(DirectiveMaps.MAPS, function(e){ return e.id == map_id })[0]
  }
}

$(document).ready(function() {
  $('ul.form-names li div a').click(function() {
    var id = $(this).attr('href')
    $('section.info').hide()
    DirectiveMaps.renderMap(id)
    $(id).show()

    // Need to trigger resize to get the map to render properly.
    google.maps.event.trigger(current_map, "resize")
    return false
  })

  DirectiveMaps.renderMap('cha')
})
