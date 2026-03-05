import { attachClickListener } from "./markers";
/** save coord, add the marker,  */
export function handleLocationSuccess(position, locations, map, tt, useLocationBtn)
{
	const { latitude, longitude } = position.coords;
	console.log('User location:', latitude, longitude);
	const isFirstMarker = locations.length === 0;
	
		const marker = new tt.Marker({
        color: isFirstMarker ? '#B73188' : '#165634'})
        .setLngLat([longitude, latitude])
        .addTo(map);
	attachClickListener(marker, locations, map, tt);
	
	const location = {
		id: Date.now(),
		lng: longitude,
		lat: latitude,
		marker: marker
	};
	locations.push(location);
	map.flyTo({
		center: [longitude, latitude],
		zoom: 12
	});
	useLocationBtn.disabled = false;
	useLocationBtn.textContent = '📍';
}

export function handleLocationError(error, useLocationBtn)
{
	let message = '';
	if (error.code === 1) //Blocked
		message = 'Please allow location access in your browser';
	else if (error.code === 2) //unavailable
		message = 'Location unavailable. Check your GPS settings';
	else if (error.code === 3) //request timeout
		message =  'Location request timeout. Try again';
	else
		message = 'Could not get your location'
	alert(message);
	useLocationBtn.disabled=false;
	useLocationBtn.textContent='📍';
}

/**Check browser geolocation support, disable the button while loading the loc, 
 * request user location */
export function getUserLocation(locations,map, tt, useLocationBtn)
{
	if (!navigator.geolocation)
	{
		alert('Your browser does not support geolocation');
		return ;
	}
	useLocationBtn.disabled = true;
	useLocationBtn.textContent = '⏳';
	navigator.geolocation.getCurrentPosition(
		(position) => handleLocationSuccess(position, locations, map, tt, useLocationBtn),
		(error) => handleLocationError(error, useLocationBtn)
	);
}