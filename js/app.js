import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { setupWelcome } from './utils.js';
import {attachClickListener} from './markers.js';
import { getUserLocation } from './geolocation.js';


document.addEventListener('DOMContentLoaded', () => {
    setupWelcome();
});
const map = tt.map({
    key: import.meta.env.VITE_API_KEY,
    container: 'map',
    center: [ 4.8647172085932056, 52.37212469778499], // [lng, lat]
    zoom: 12.5
});

let locations = [];

map.on('click', (event) => {
	console.log('Map clicked', event.lngLat);
});

map.on('click', (event) => {
	const { lng, lat } = event.lngLat;
	const isFirstMarker = locations.length === 0;
	const marker = new tt.Marker({color: isFirstMarker ? '#B73188' : '#165634'})
		.setLngLat([lng, lat])
		.addTo(map);
	attachClickListener(marker, locations, map, tt);
	const location = {
		id: Date.now(),
		lng: lng,
		lat: lat,
		marker: marker
	};
	locations.push(location);
	console.log('Locations array:', locations);
});


const useLocationBtn = document.getElementById('use-loc');

if (useLocationBtn)
{
	const originInput = document.getElementById('origin-input');
	useLocationBtn.addEventListener('click', () => getUserLocation(locations, map, tt, useLocationBtn, originInput));
}





/*If location length is still 0, it is first marker -> change origin color accordingly
-
*/
