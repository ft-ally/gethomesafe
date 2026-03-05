
/** Add a click listener to markers, stop propagation when clicked, remove marker from map, 
 * remove location from array. Also handles changing of marker color when origin is removed */

export function attachClickListener(marker, locations, map, tt) {
	const markerElement = marker.getElement();
	markerElement.addEventListener('click', (e) => {
		e.stopPropagation();
		const index = locations.findIndex(loc => loc.marker === marker);
		const wasOrigin = index === 0;
		marker.remove();
		if (index !== -1) {
			locations.splice(index, 1);
		}
		if (wasOrigin && locations.length > 0) {
			const newOrigin = locations[0].marker;
			newOrigin.remove();
			const newOriginMarker = new tt.Marker({color: '#B73188'})
				.setLngLat([locations[0].lng, locations[0].lat])  // FIXED: Use lng/lat
				.addTo(map);
			locations[0].marker = newOriginMarker;
			attachClickListener(newOriginMarker, locations, map, tt);
		}
		console.log('Location removed. Remaining:', locations.length);
	});
}

