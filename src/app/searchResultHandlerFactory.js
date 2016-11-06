import SearchResultHandler from './services/SearchResultHandler';

import {
    SEARCH_RESULT_SUMMARY_CONTAINER_ID, SEARCH_RESULT_CONTAINER_ID, PAGINATION_CONTAINER_ID
} from './constants';

import ResultComponentBuilder from './Components/ResultComponentBuilder';
import SummaryComponentBuilder from './Components/SummaryComponentBuilder';
import PaginationComponentBuilder from './Components/PaginationComponentBuilder';

import columnsDefinition from './columnsDefinition';

const searchResultContainerEl = document.getElementById(SEARCH_RESULT_CONTAINER_ID);
const searchResultSummaryContainerEl = document.getElementById(SEARCH_RESULT_SUMMARY_CONTAINER_ID);
const paginationContainerEl = document.getElementById(PAGINATION_CONTAINER_ID);

const resultComponentBuilder = new ResultComponentBuilder(columnsDefinition);
const summaryComponentBuilder = new SummaryComponentBuilder();
const paginationComponentBuilder = new PaginationComponentBuilder();

const factory = function () {
    return new SearchResultHandler(
        searchResultContainerEl,
        searchResultSummaryContainerEl,
        paginationContainerEl,
        resultComponentBuilder,
        summaryComponentBuilder,
        paginationComponentBuilder
    );
};

export default factory;
