import * as $ from 'jquery';

import {SEARCH_BUTTON_ID, SEARCH_FIELD_ID, PAGINATION_CONTAINER_ID} from './constants';
import {THE_MOVIE_DB_API_KEY} from './config';

import SearchService from './services/SearchService';
import ApiClient from './services/MovieDbApiClient';
import handlerFactory from './searchResultHandlerFactory';

const searchButtonEl = document.getElementById(SEARCH_BUTTON_ID);
const searchFieldEl = document.getElementById(SEARCH_FIELD_ID);
const paginationContainerEl = document.getElementById(PAGINATION_CONTAINER_ID);

const searchService = new SearchService(new ApiClient(THE_MOVIE_DB_API_KEY, $));
const searchResultHandler = handlerFactory();

const searchHandler = (pageNumber) => {
    searchService.search(searchFieldEl.value, pageNumber)
        .then(response => {
            searchResultHandler.handleResponse(response);
            window.scrollTo(0, 0);
        });
};

paginationContainerEl.addEventListener('click', (ev) => {
    //if user clicks on pagination anchor element it should contain 'data-page' attribute
    let pageNumber = ev.target.getAttribute('data-page');
    ev.preventDefault();

    pageNumber && searchHandler(pageNumber);
});

searchButtonEl.addEventListener('click', searchHandler.bind(null, 1));
searchFieldEl.addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;

    if (key === 13) {
        searchHandler();
    }
});

