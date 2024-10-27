import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { fetchCoordinates } from '../utils/helperFunctions';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Point from 'ol/geom/Point';
import { setZoomLevel } from '../features/zoomSlice';

const MapComponent = () => {
  const mapRef = useRef(null);
  const zoomLevel = useSelector((state) => state.zoom);
  const target = useSelector((state) => state.model.target);
  const action = useSelector((state) => state.model.action);
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const initialVectorSource = new VectorSource();
    
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: initialVectorSource,
          style: new Style({
            image: new CircleStyle({
              radius: 10,
              fill: new Fill({ color: 'rgba(255, 0, 0, 0.6)' }),
              stroke: new Stroke({ color: 'rgba(255, 0, 0, 1)', width: 2 }),
            }),
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: zoomLevel,
      }),
    });

    setMap(initialMap);
    setVectorSource(initialVectorSource);

    return () => {
      initialMap.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (map && coordinates) {
      const newCenter = fromLonLat(coordinates);
      if(zoomLevel < 4) {
        console.log(zoomLevel)
        dispatch(setZoomLevel(zoomLevel + 10));
      }
      map.getView().animate({
        center: newCenter,
        zoom: zoomLevel,
        duration: 1000,
      });
      console.log(zoomLevel)
      vectorSource.clear();

      const feature = new Feature({
        geometry: new Point(newCenter),
      });

      vectorSource.addFeature(feature);
    }
  }, [map, coordinates, vectorSource, zoomLevel]);

  useEffect(() => {
    if (!target) return;
    if (target.length > 1 && action == "calculateDistance") {
      console.log(target);


    } else{
      fetchCoordinates(target).then((coords) => {
        if (coords) {
          const { latitude, longitude } = coords;
          setCoordinates([longitude, latitude]);
        }
      });
    }
  }, [target]);

  return (
    <div className='map-container' ref={mapRef} />
  );
};

export default MapComponent;
