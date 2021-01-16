import axios from 'axios';
import { encode } from 'querystring'

import { get_query_area_config, get_query_count_config, api_url } from './config'

interface FeatureRecord {
    attributes: {
        'Shape.STArea()': number;
    }
}

export default async function main() {
    let feature_count = 0;

    try {
        console.log('Querying parcel counts...');
        const { data }: { data: { count: number } } = await axios.get(`${api_url}?${encode(get_query_count_config())}`);
        feature_count = data.count;
    } catch (e) {
        console.error(e);
    }

    let all_features: FeatureRecord[] = [];
    let shouldQueryNextPage = false;
    const query_area_config = get_query_area_config();
    try {
        console.log('Querying parcel data...');
        do {
            const { data }: {
                data: {
                    features: FeatureRecord[],
                    exceededTransferLimit: boolean
                }
            } = await axios.get(`${api_url}?${encode(query_area_config)}`);

            const { features = [], exceededTransferLimit } = data;
            // Setup resultOffset for querying the next "page" of records
            query_area_config.resultOffset += features.length;

            // docs: https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
            // exceededTransferLimit "indicates there are more query results and you can continue to page through the results"
            shouldQueryNextPage = exceededTransferLimit;

            // Add the features retrieved from this request to the total list of features
            all_features = all_features.concat(features);
            console.log(`Loaded... ${all_features.length} of ${feature_count}`);
        } while (shouldQueryNextPage);
    } catch (e) {
        console.error(e)
    }

    if (all_features.length !== feature_count) {
        console.error('Paginated query did not return all features.');
    }

    const sum_of_areas = all_features.reduce((sum, current) => {
        sum += current.attributes['Shape.STArea()'];
        return sum;
    }, 0);

    console.log(`Of ${feature_count} parcels, the average area is ${sum_of_areas / feature_count}`);
}