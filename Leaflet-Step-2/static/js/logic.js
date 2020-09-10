// Creating map object
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Variable to hold earthquakes data as a layer group
var earthquakes = new L.LayerGroup();

// Grab geoJSON data with d3
d3.json(url, function(data) {
    
    // Define the color of the marker based on the magnitude of the earthquake.
    function chooseColor(magnitude) {
        switch (true) {
            case magnitude > 5:
                return "#F70A18";
            case magnitude > 4:
                return "#C58AF1";
            case magnitude > 3:
                return "#8AB4F1";
            case magnitude > 2:
                return "#8AF1E1";
            case magnitude > 1:
                return "#B3F18A";
            default:
                return "#E5F70A";
        }
    };

    // Add GeoJSON layer to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlong) {
        return L.circleMarker(latlong);
        },
        // Get radius of circles by magnitude
        style: function(feature) {
            return {
              opacity: .75,
              fillOpacity: .75,
              fillColor: chooseColor(feature.properties.mag),
              color: "black",
              radius: (feature.properties.mag) * 5,
              stroke: true,
              weight: 0.5
            };
        },
        // Binding a tooltip to each layer
        onEachFeature: function(feature, layer) {
            layer.bindTooltip("<strong>Location:</strong> " + feature.properties.place + "<hr><strong>Time:</strong> " + 
            new Date(feature.properties.time) + "<hr><strong>Magnitude:</strong> " + feature.properties.mag);
        }

    }).addTo(earthquakes);

    earthquakes.addTo(myMap);

    // Set up legend
    var legend = L.control({position: "topright"});
    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "info legend"),    
        limits = [0, 1, 2, 3, 4, 5],
  
        // Legend title
        legendInfo = "<p>Magnitude<p>" + "<hr>";
        div.innerHTML = legendInfo;

        for (var i = 0; i < limits.length; i++) {
            div.innerHTML += "<i style='background: " + chooseColor([i + 1]) + "'></i> " +
            limits[i] + (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
        }
        console.log(div.innerHTML);
        console.log(legend);
        return div;

    };

    // Adding Legend to the map
    legend.addTo(myMap);
});