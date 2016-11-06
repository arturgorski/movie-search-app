import {API_SEARCH_URL} from './../constants';

class MovieDbApiClient {

    /**
     * @param {string} apiKey The Movie Database API key
     * @param {Object} $ jQuery object
     * @see https://developers.themoviedb.org/3/getting-started/authentication
     */
    constructor(apiKey, $) {
        this.apiKey = apiKey;
        this.$ = $;
    }

    /**
     * Calls API method to search movie
     *
     * @param {string} term the search term
     * @param {number} pageNumber page number
     * @returns {Promise}
     */
    search(term, pageNumber) {
        return this.$.get(
            API_SEARCH_URL,
            {
                api_key: this.apiKey,
                query: term,
                page: pageNumber
            }
        )

    }
}

export default MovieDbApiClient;
