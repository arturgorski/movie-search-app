class PaginationComponentBuilder {

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
     * @param results.total_pages {number} amount of result pages
     * @param results.page {number} current page
     * @returns {PaginationComponentBuilder}
     */
    build(results) {
        this.html = '';

        this.addCurrentPageInfo(results.total_pages, results.page)
            .addPagination(results.total_pages, results.page);

        return this;
    }

    /**
     * Adds pagination summary
     *
     * @param {number} totalPages
     * @param {number} currentPage
     * @returns {PaginationComponentBuilder}
     */
    addCurrentPageInfo(totalPages, currentPage) {
        this.html += `<span>Page ${currentPage} of ${totalPages}</span>`;

        return this;
    }

    /**
     * Adds pagination element
     *
     * @param {number} totalPages
     * @param {number} currentPage
     * @returns {PaginationComponentBuilder}
     */
    addPagination(totalPages, currentPage) {
        if (totalPages > 1) {
            this.html += `<ul class="pagination">`;
            for (let i = 1; i <= totalPages; i++) {
                this.html += this.getPaginationEl(i, currentPage);
            }
            this.html += `</ul>`;
        }

        return this;
    }

    /**
     * Create pagination element for single page
     *
     * @param {number} page
     * @param {number} currentPage
     * @returns {string} html element
     */
    getPaginationEl(page, currentPage) {
        let classAttr = page === currentPage ? ' class="current"' : '';

        return `<li${classAttr}><a href="" data-page="${page}">${page}</a></li>`
    }
}

export default PaginationComponentBuilder;
