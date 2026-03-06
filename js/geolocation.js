import { attachClickListener } from "./markers";

/**Using reverse geocoding api */
async function getAddressFromCoordinates(latitude, longitude)
{
	try {
		const apiKey = import.meta.env.VITE_API_KEY;
		const url = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${apiKey}`;
		
		const response = await fetch(url);
		const data = await response.json();
		if (data.addresses && data.addresses.length > 0)
		{
			const address = data.addresses[0].address.freeformAddress;
			return address;
		}
		
		return 'Current location';
	} catch (error) {
		console.error('Error getting address: ', error);
		return 'Current Location';
	}
}


/** save coord, add the marker,  */
export async function handleLocationSuccess(position, locations, map, tt, useLocationBtn, originInput)
{
	const { latitude, longitude } = position.coords;
	console.log('User location:', latitude, longitude);
	const address = await getAddressFromCoordinates(latitude, longitude);
	console.log('Address: ', address);
	if (originInput)
		originInput.value = address;
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
export function getUserLocation(locations,map, tt, useLocationBtn, originInput)
{
	if (!navigator.geolocation)
	{
		alert('Your browser does not support geolocation');
		return ;
	}
	useLocationBtn.disabled = true;
	useLocationBtn.textContent = '⏳';
	navigator.geolocation.getCurrentPosition(
		(position) => handleLocationSuccess(position, locations, map, tt, useLocationBtn, originInput),
		(error) => handleLocationError(error, useLocationBtn)
	);
}