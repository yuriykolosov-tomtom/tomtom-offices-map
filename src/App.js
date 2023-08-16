import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "./leaflet_container.css";

function App() {
  const initialPosition = [51.505, -0.09];
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    axios.get(`tt_tomtom_offices.geojson`).then((response) => {
      const officesGeoJSON = response.data;

      // Process the GeoJSON data and create Marker components
      const markersData = officesGeoJSON.features.map((office) => (
        <Marker
          position={[
            office.geometry.coordinates[1],
            office.geometry.coordinates[0],
          ]}
          key={office.properties.ref}
        >
          <Popup maxHeight={300} maxWidth={300}>
            {Object.entries(office.properties).map((entry) => (
              <div>
                <b>{entry[0]}</b>: {entry[1]}
              </div>
            ))}
          </Popup>
        </Marker>
      ));

      // Render the markers on the map
      setMarkers(markersData);
    });
  }, []);

  return (
    <MapContainer center={initialPosition} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}

export default App;
