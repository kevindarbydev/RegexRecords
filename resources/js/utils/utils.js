import axios from "axios";

const resources = {};

const makeRequestCreator = (proxyUrl) => {
    let cancel;
    console.log("Proxy: " + proxyUrl);
    const axiosInstance = axios.create({
        baseURL: proxyUrl,
    });

    return async (query) => {
        console.log(query);
        const [releaseTitle, artistName] = query.split(",");
        const params = {
            release_title: releaseTitle,
            artist: artistName,
        };
      
        const preciseQuery = `release_title=${encodeURIComponent(
            params.release_title
        )}&artist=${encodeURIComponent(params.artist)}`;   
  
        console.log("pq: " + preciseQuery);

        if (cancel) {
            // Cancel the previous request before making a new request
            cancel.cancel();
            console.log("cancelling request!");
        }
        // Create a new CancelToken
        cancel = axios.CancelToken.source();
        try {
            const cacheKey = `${releaseTitle},${artistName}`;
            if (resources[cacheKey]) {
                // Return result if it exists
                console.log("Found values already cached!");
                return resources[query];
            }
            const res = await axiosInstance.get("", {
                params: {
                    url: "https://api.discogs.com/database/search", //
                    q: preciseQuery,
                },
                cancelToken: cancel.token,
            });

            const result = res.data.results;
            // Store response
            resources[query] = result;

            return result;
        } catch (error) {
            if (axios.isCancel(error)) {
                // Handle if request was cancelled
                console.log("Request canceled", error.message);
            } else {
                // Handle usual errors
                console.log("Something went wrong: ", error.message);
            }
        }
    };
};

export default makeRequestCreator;
