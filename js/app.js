import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { attachClickListener } from './utils.js';

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
	locations.push({location});
	
});




/*If location length is still 0, it is first marker -> change origin color accordingly
-
*/

// TODO:
// 1. Click on map to add markers (saved loc)
// 2. Search for places
// 3. Calculate routes between points
// 4. Save/load locations from localStorage
// 5. Add UI controls (buttons, search bar)
