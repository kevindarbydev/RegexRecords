import axios from "axios";

const resources = {};

const makeRequestCreator = (proxyUrl) => {
    let cancel;
    console.log("Proxy: " + proxyUrl)
    const axiosInstance = axios.create({
        baseURL: proxyUrl,
    });

    return async (query) => {
        if (cancel) {
            // Cancel the previous request before making a new request
            cancel.cancel();
            console.log("cancelling request!")
        }
        // Create a new CancelToken
        cancel = axios.CancelToken.source();
        try {
            if (resources[query]) {
                // Return result if it exists
                console.log("Found values already cached!")
                return resources[query];
            }
            const res = await axiosInstance.get("", {
                params: {
                    url: "https://api.discogs.com/database/search", //
                    q: query,                  
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
