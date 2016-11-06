class SummaryComponentBuilder {

    constructor() {
        this.html = '';
    }

    /**
     * @returns {string} component html
     */
    getHtml() {
        return this.html;
    }

    /**
     * Builds component
     *
     * @param results {Object} search results
     * @param results.total_results {number} amount of found records
     * @returns {SummaryComponentBuilder}
     */
    build(results) {
        this.html = '';

        this.addFoundRecordsInfo(results.total_results);

        return this;
    }

    /**
     * Adds information about amount of found records
     *
     * @param {number} totalResults amount of found records
     * @returns {SummaryComponentBuilder}
     */
    addFoundRecordsInfo(totalResults) {
        this.html += totalResults ? `<h5>Records found: ${totalResults} </h5>` : `<h5>No records found :(</h5>`;

        return this;
    }
}

export default SummaryComponentBuilder;
