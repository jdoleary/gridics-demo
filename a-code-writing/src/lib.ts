
import axios from 'axios';
import { encode } from 'querystring'

import { get_query_area_config, get_query_count_config, api_url } from './config'

export default async function main() {
    let all_features = [];
    let shouldQueryNextPage = false;
    const query_area_inst = get_query_area_config();
    const query_count_inst = get_query_count_config();
    let feature_count = 0;

    try{
        console.log('Querying parcel counts...');
        const { data } = await axios.get(`${api_url}?${encode(query_count_inst)}`);
        feature_count = data.count;
        console.log(`There are ${feature_count} features.`);
    }catch(e){
        console.error(e);
    }

    try {
        console.log('Querying parcel data...');
        do {
            const { data } = await axios.get(`${api_url}?${encode(query_area_inst)}`);
            const { features = [], exceededTransferLimit } = data;
            query_area_inst.resultOffset += features.length;

            // docs: https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
            // exceededTransferLimit "indicates there are more query results and you can continue to page through the results"
            shouldQueryNextPage = exceededTransferLimit;

            // Add the features retrieved from this request to the total list of features
            all_features = all_features.concat(features);
            console.log(`Loaded... ${all_features.length}`);
        } while (shouldQueryNextPage);
    } catch (e) {
        console.error(e)
    }

    if(all_features.length !== feature_count){
        console.error('Paginated query did not return all features.');
    }

    const sum_of_areas = all_features.reduce((sum, current) => {
        sum += current.attributes['Shape.STArea()'];
        return sum;
    }, 0);
    console.log(`The average parcel size is ${sum_of_areas/feature_count}`);
}