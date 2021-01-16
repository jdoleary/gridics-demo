// Config expressed as functions which return a config object
// so that the config object can be mutated (for pagination) without affecting the original
export const get_query_area_config = () => ({
    where: '1=1',
    outFields: 'Shape.STArea()',
    returnGeometry: false,
    returnTrueCurves: false,
    returnIdsOnly: false,
    returnCountOnly: false,
    returnZ: false,
    returnM: false,
    returnDistinctValues: false,
    returnExtentOnly: false,
    featureEncoding: 'esriDefault',
    f: 'pjson',
    resultOffset: 0
});
export const get_query_count_config = () => ({
    where: '1=1',
    outFields: '*',
    returnGeometry: false,
    returnTrueCurves: false,
    returnIdsOnly: false,
    returnCountOnly: true,
    returnZ: false,
    returnM: false,
    returnDistinctValues: false,
    returnExtentOnly: false,
    featureEncoding: 'esriDefault',
    f: 'pjson',
});

export const api_url = 'https://gis.cupertino.org/cupgis/rest/services/Public/AmazonData/MapServer/11/query'