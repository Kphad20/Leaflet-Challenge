# Leaflet - USGS Earthquake Map

## Task
The first task is to visualize an earthquake data set.
1. Get data set

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize (I will visualize "All Earthquakes from the Past 7 Days"), which will be given a JSON representation of that data. I will use the URL of this JSON to pull in the data for the visualization.

2. Import & Visualize the Data

I will create a map using Leaflet that plots all of the earthquakes from the dataset based on their longitude and latitude.

The data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

I will include pop-ups that provide additional information about the earthquake when a marker is clicked.

Lastly, I will create a legend that will provide context for the map data.
