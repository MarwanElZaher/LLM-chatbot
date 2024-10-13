import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import TileWMS from 'ol/source/TileWMS.js';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import 'ol/ol.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const zoomLevel = useSelector((state) => state.zoom);


  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          extent : [2780000, 2500000, 4200000, 3750000],
          source: new TileWMS({
            url: 'http://devstable.eastus.cloudapp.azure.com:8082/geoserver/resource_center/wms',
            params: {'LAYERS': 'resource_center:Lyr3', 'TILED': false},
            serverType: 'geoserver',
            transition: 10,
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: zoomLevel,
      }),
    });

    return () => map.setTarget(null); 
  }, [zoomLevel]);



  return (
    <div
      className='map-container'
      ref={mapRef}
    />
  );
};

export default MapComponent;
