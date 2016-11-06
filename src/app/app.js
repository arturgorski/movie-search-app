import * as $ from 'jquery';

import {
    SEARCH_BUTTON_ID, SEARCH_RESULT_SUMMARY_CONTAINER_ID,
    SEARCH_FIELD_ID, SEARCH_RESULT_CONTAINER_ID, PAGINATION_CONTAINER_ID
} from './constants';
import {THE_MOVIE_DB_API_KEY} from './config';

import SearchService from './services/SearchService';
import ApiClient from './services/MovieDbApiClient';
import ResultComponentBuilder from './Components/ResultComponentBuilder';
import SummaryComponentBuilder from './Components/SummaryComponentBuilder';
import PaginationComponentBuilder from './Components/PaginationComponentBuilder';

import columnsDefinition from './columnsDefinition';

const searchButtonEl = document.getElementById(SEARCH_BUTTON_ID);
const searchFieldEl = document.getElementById(SEARCH_FIELD_ID);
const searchResultContainerEl = document.getElementById(SEARCH_RESULT_CONTAINER_ID);
const searchResultSummaryContainerEl = document.getElementById(SEARCH_RESULT_SUMMARY_CONTAINER_ID);
const paginationContainerEl = document.getElementById(PAGINATION_CONTAINER_ID);

const searchService = new SearchService(new ApiClient(THE_MOVIE_DB_API_KEY, $));
const resultComponentBuilder = new ResultComponentBuilder(columnsDefinition);
const summaryComponentBuilder = new SummaryComponentBuilder();
const paginationComponentBuilder = new PaginationComponentBuilder();

const searchHandler = (pageNumber) => {
    searchService.search(searchFieldEl.value, pageNumber)
        .then(response => {
            searchResultContainerEl.innerHTML = '';
            searchResultSummaryContainerEl.innerHTML = '';
            paginationContainerEl.innerHTML = '';

            searchResultContainerEl.innerHTML = response.total_results ? resultComponentBuilder.build(response.results).getHtml() : '';
            searchResultSummaryContainerEl.innerHTML = summaryComponentBuilder.build(response).getHtml();
            paginationContainerEl.innerHTML = response.total_results ? paginationComponentBuilder.build(response).getHtml() : '';

            window.scrollTo(0, 0);
        });
};

paginationContainerEl.addEventListener('click', (ev) => {
    let pageNumber = ev.target.getAttribute('data-page');
    ev.preventDefault();

    pageNumber && searchHandler(pageNumber);
});

searchButtonEl.addEventListener('click', searchHandler);
searchFieldEl.addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;

    if (key === 13) {
        searchHandler();
    }
});

