process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const willhaben = require(".");
const fs = require('fs');

const searchResultsUrl = "https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?sfId=97e74391-73d0-4b3f-97eb-1911da7fa04e&isNavigation=true&NO_OF_ROOMS_BUCKET=3X3&areaId=306&areaId=317&page=1&rows=90&PRICE_TO=1800&ESTATE_SIZE/LIVING_AREA_FROM=60%22";

const fullAttributeNames = ["id", "createdDate", "description", "building_type"]; //"price", "estate_size", "no_of_rooms", "coordinates", "floor", 
const partialAttributeNames = ["general_text_advert", "location/address"]; //, "size"

willhaben.getEnrichedListings(searchResultsUrl, fullAttributeNames, partialAttributeNames)
    .then(json => {
        // Save the entire JSON response to a file
        fs.writeFileSync('SearchResults.json', JSON.stringify(json, null, 4));
        console.log('All fields have been saved to SearchResults.json');
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });