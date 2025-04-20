const axios=require('axios');
module.exports.getAddressCoordinates=async (address)=>{
    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        } else {
            throw new Error(`Geocoding error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
}
module.exports.getDistanceTime=async(origin,destination)=>{
    if(!origin||!destination)
    {
        throw new Error('origin and dest required')
    }
    const apiKey=process.env.GOOGLE_MAPS_API;
    try{
        const response=await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json',{
            params:{
                origins:origin,
                destinations:destination,
                key:apiKey
            }
        })
        console.log("Requesting:", response.config.url);
        if(response.data.status==='OK')
        {
            if(response.data.rows[0].elements[0].status=='ZERO_RESULTS')
            {
                throw new Error('no routes found')
            }


        const elements=response.data.rows[0].elements[0];
        return elements;
        }
        else{
            throw new Error('Unable to fetch distance and time');
        }
    }
    catch(error)
    {
        console.log(error);
        throw error
    }
        
}
module.exports.getAutoCompleteSuggestions=async(input)=>{
    if(!input)
    {
        throw new Error('address is required');
    }
    const apiKey=process.env.GOOGLE_MAPS_API;
    const  url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`

    try{
        const response=await axios.get(url);
        if(response.data.status=='OK')
        {
            return response.data.predictions;
        }
        else{
            throw new Error('Unable to fetch suggestions')
        }
    }
    catch(err)
    {
         throw new Error(err); //this error is thrown in the console.
    }
}