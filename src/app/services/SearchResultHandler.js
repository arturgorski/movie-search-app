class SearchResultHandler {

    /**
     * @param {Element} searchResultContainerEl search result container element
     * @param {Element} searchResultSummaryContainerEl search result summary container element
     * @param {Element} paginationContainerEl pagination container element
     * @param {ResultComponentBuilder} resultComponentBuilder
     * @param {PaginationComponentBuilder} paginationComponentBuilder
     * @param {SummaryComponentBuilder} summaryComponentBuilder
     */
    constructor(searchResultContainerEl,
                searchResultSummaryContainerEl,
                paginationContainerEl,
                resultComponentBuilder,
                summaryComponentBuilder,
                paginationComponentBuilder
    ) {
        this.searchResultContainerEl = searchResultContainerEl;
        this.searchResultSummaryContainerEl = searchResultSummaryContainerEl;
        this.paginationContainerEl = paginationContainerEl;
        this.resultComponentBuilder = resultComponentBuilder;
        this.paginationComponentBuilder = paginationComponentBuilder;
        this.summaryComponentBuilder = summaryComponentBuilder;
    }

    /**
     * Clears all containers
     */
    clearAll() {
        this.searchResultContainerEl.innerHTML = '';
        this.searchResultSummaryContainerEl.innerHTML = '';
        this.paginationContainerEl.innerHTML = '';
    }


    /**
     * Handles response from movie database API
     *
     * @param {Object} response
     */
    handleResponse(response) {
        this.clearAll();

        this.searchResultContainerEl.innerHTML = response.total_results ? this.resultComponentBuilder.build(response.results).getHtml() : '';
        this.searchResultSummaryContainerEl.innerHTML = this.summaryComponentBuilder.build(response).getHtml();
        this.paginationContainerEl.innerHTML = response.total_results ? this.paginationComponentBuilder.build(response).getHtml() : '';
    }
}


export default SearchResultHandler;
