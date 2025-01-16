process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const willhaben = require(".");
const fetch = require('node-fetch');
const fs = require('fs');

const urlStart = "https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?sfId=97e74391-73d0-4b3f-97eb-1911da7fa04e&isNavigation=true&NO_OF_ROOMS_BUCKET=3X3&areaId=306&areaId=317&";
const urlEnd = "&rows=90&PRICE_TO=1800&ESTATE_SIZE/LIVING_AREA_FROM=60%22";

const fullAttributeNames = ["id", "createdDate", "description", "building_type"];
const partialAttributeNames = ["general_text_advert", "location/address"];

async function getAllListings(urlStart, urlEnd, fullAttributeNames, partialAttributeNames) {
    let page = 1;
    let allResults = [];
    let hasMoreResults = true;

    while (hasMoreResults) {
        const searchResultsUrl = `${urlStart}page=${page}${urlEnd}`;
        console.log(`Fetching data from: ${searchResultsUrl}`);

        try {
            const results = await willhaben.getEnrichedListings(searchResultsUrl, fullAttributeNames, partialAttributeNames);
            if (results.length > 0) {
                allResults = allResults.concat(results);
                page++;
            } else {
                hasMoreResults = false;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            hasMoreResults = false;
        }
    }

    return allResults;
}

getAllListings(urlStart, urlEnd, fullAttributeNames, partialAttributeNames)
    .then(json => {
        // Save the entire JSON response to a file
        fs.writeFileSync('SearchResults.json', JSON.stringify(json, null, 4));
        console.log('All fields have been saved to SearchResults.json');
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });