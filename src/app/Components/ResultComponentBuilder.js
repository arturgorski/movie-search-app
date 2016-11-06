/**
 * @typedef FormatterFunction
 * @type {Function}
 * @param {string} value - value to format
 * @return {string} formatted value
 */

/**
 * Object that defines mapping between results object and table cells properties and values
 *
 * @typedef ColumnDefinition
 * @type {Object}
 * @property {string} propertyName Name of the property from result object
 * @property {string} headerTitle Column title for given property
 * @property {number} [width] Column width (optional)
 * @property {FormatterFunction} [formatter] formatter function (optional)
 */


class ResultComponentBuilder {

    /**
     * @param {Array<ColumnDefinition>} columnsDefinition
     */
    constructor(columnsDefinition) {
        this.html = '';
        this.columnsDefinition = columnsDefinition;
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
     * @param results {Array<Object>} results to display
     * @returns {ResultComponentBuilder}
     */
    build(results) {
        this.html = '';

        this.tableStart()
            .addHeader(this.columnsDefinition)
            .addTableBody(this.columnsDefinition, results)
            .tableEnd();

        return this;
    }

    /**
     * Builds header cell
     *
     * @param {ColumnDefinition} columnDefinition
     * @returns {string} header cell html
     */
    getHeaderCell(columnDefinition) {
        let widthAtrr = columnDefinition.width ? ` width="${columnDefinition.width}"` : '';

        return `<th${widthAtrr}>${columnDefinition.headerTitle}</th>`;
    }


    /**
     * Adds header to table html
     *
     * @param {Array<ColumnDefinition>} columnsDefinition
     * @returns {ResultComponentBuilder}
     */
    addHeader(columnsDefinition) {
        this.html += '<thead><tr>';
        this.html += columnsDefinition.reduce((html, definition) => html + this.getHeaderCell(definition), '');
        this.html += '</tr></thead>';

        return this;
    }

    /**
     * Builds table cell for given column and results row
     *
     * @param {ColumnDefinition} columnDefinition
     * @param {Object} resultRow
     * @returns {string} table cell html
     */
    getResultCell(columnDefinition, resultRow) {
        let rawValue = resultRow[columnDefinition.propertyName];
        let cellContent = columnDefinition.formatter ? columnDefinition.formatter(rawValue) : rawValue;

        return `<td>${cellContent}</td>`;
    }

    /**
     * Builds table row for results row
     *
     * @param {Array<ColumnDefinition>} columnDefinition
     * @param {Object} resultRow
     * @returns {string} table row html
     */
    getResultRow(columnsDefinition, resultRow) {
        let returnedHtml = '<tr>';
        returnedHtml += columnsDefinition.reduce((html, definition) => html + this.getResultCell(definition, resultRow), '');
        returnedHtml += '</tr>';

        return returnedHtml;
    }


    /**
     * Adds body to table html
     *
     * @param {Array<ColumnDefinition>} columnDefinition
     * @param {Array<Object>} results
     * @returns {ResultComponentBuilder}
     */
    addTableBody(columnsDefinition, results) {
        this.html += '<tbody>';
        results.forEach(result => {
            this.html += this.getResultRow(columnsDefinition, result);
        });
        this.html += '</tbody>';

        return this;
    }

    /**
     * Opens table
     *
     * @returns {ResultComponentBuilder}
     */
    tableEnd() {
        this.html += '</table>';

        return this;
    }

    /**
     * Closes table
     *
     * @returns {ResultComponentBuilder}
     */
    tableStart() {
        this.html += '<table>';

        return this;
    }
}

export default ResultComponentBuilder;
