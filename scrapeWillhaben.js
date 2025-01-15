process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const willhaben = require('willhaben');
const fs = require('fs');
// const httpPath = "https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?sfId=97e74391-73d0-4b3f-97eb-1911da7fa04e&isNavigation=true&NO_OF_ROOMS_BUCKET=3X3&areaId=306&areaId=317&page=1&rows=90&PRICE_TO=1800&ESTATE_SIZE/LIVING_AREA_FROM=60%22";
const httpPath = "https://www.willhaben.at/iad/immobilien/d/mietwohnungen/niederoesterreich/baden/erstbezug-wohlfuehlen-im-triestingtal-haus1-18-2029263595";

willhaben.getListings(httpPath)
    .then(json => {
        // Save the entire JSON response to a file
        fs.writeFileSync('listings.json', JSON.stringify(json, null, 4));
        console.log('All fields have been saved to listings.json');
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });