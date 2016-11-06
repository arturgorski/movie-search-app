class SearchService {

    /**
     * @param {MovieDbApiClient} apiClient API client service
     */
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    /**
     * Search for movies by given term
     *
     * @param {string} term
     * @param {number} pageNumber
     * @returns {Promise}
     */
    search(term, pageNumber = 1) {
        term = term.trim();

        return term ? this.apiClient.search(term, pageNumber) : Promise.resolve({results: []});
    }
}

export default SearchService;
