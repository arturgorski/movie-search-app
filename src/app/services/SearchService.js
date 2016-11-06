class SearchService {

    /**
     * @param {MovieDbApiClient} apiClient API client service
     */
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    /**
     *  Search for movies by given term
     *
     * @param term
     * @returns {*}
     */
    search(term) {
        term = term.trim();

        console.log(term);

        return term ? this.apiClient.search(term) : Promise.resolve({results: []});
    }
}

export default SearchService;
