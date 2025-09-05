import axios from "axios";

export const useFetchLaunchesData = async (limit, offset, query = {}) => {
    let queryString = "";
    let baseURL = 'https://api.spacexdata.com/v3/launches';

    if (query?.launch_success === 'upcoming') {
        baseURL = baseURL + '/upcoming'
    } else if (query?.launch_success === 'true' || query?.launch_success === 'false') {
        queryString = `launch_success=${query?.launch_success}&`
    }

    queryString = queryString + (Object.keys({ start: query?.start, end: query?.end }).map(key => `${key}=${query[key]}`).join("&") || '');

    const data = await axios.get(`${baseURL}?limit=${limit}&offset=${offset}&${queryString}`);
    return data;
}