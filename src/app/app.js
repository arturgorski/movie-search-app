import * as $ from 'jquery';

import {SEARCH_BUTTON_ID, SEARCH_RESULT_SUMMARY_CONTAINER_ID, SEARCH_FIELD_ID, SEARCH_RESULT_CONTAINER_ID} from './constants';
import {THE_MOVIE_DB_API_KEY} from './config';

import SearchService from './services/SearchService';
import ApiClient from './services/MovieDbApiClient';
import ResultComponentBuilder from './Components/ResultComponentBuilder';
import SummaryComponentBuilder from './Components/SummaryComponentBuilder';

import columnsDefinition from './columnsDefinition';

const searchButtonEl = document.getElementById(SEARCH_BUTTON_ID);
const searchFieldEl = document.getElementById(SEARCH_FIELD_ID);
const searchResultContainerEl = document.getElementById(SEARCH_RESULT_CONTAINER_ID);
const searchResultSummaryContainerEl = document.getElementById(SEARCH_RESULT_SUMMARY_CONTAINER_ID);

const searchService = new SearchService(new ApiClient(THE_MOVIE_DB_API_KEY, $));
const resultComponentBuilder = new ResultComponentBuilder(columnsDefinition);
const summaryComponentBuilder = new SummaryComponentBuilder();

const searchHandler = () => {
    searchService.search(searchFieldEl.value)
        .then(response => {
            searchResultContainerEl.innerHTML = '';
            searchResultSummaryContainerEl.innerHTML = '';

            let searchResultContainerHtml = response.total_results ? resultComponentBuilder.build(response.results).getHtml() : '';
            let searchResultSummaryContainerHtml = summaryComponentBuilder.build(response).getHtml();

            searchResultContainerEl.innerHTML = searchResultContainerHtml;
            searchResultSummaryContainerEl.innerHTML = searchResultSummaryContainerHtml;
        });
};

searchButtonEl.addEventListener('click', searchHandler);
searchFieldEl.addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;

    if (key === 13) {
        searchHandler();
    }
});

