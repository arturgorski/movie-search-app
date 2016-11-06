import * as $ from 'jquery';

import {SEARCH_BUTTON_ID, SEARCH_FIELD_ID, SEARCH_RESULT_CONTAINER_ID} from './constants';
import {THE_MOVIE_DB_API_KEY} from './config';

import SearchService from './services/SearchService';
import ApiClient from './services/MovieDbApiClient';
import ResultComponentBuilder from './services/ResultComponentBuilder';

import columnsDefinition from './columnsDefinition';

const searchButtonEl = document.getElementById(SEARCH_BUTTON_ID);
const searchFieldEl = document.getElementById(SEARCH_FIELD_ID);
const searchResultContainerEl = document.getElementById(SEARCH_RESULT_CONTAINER_ID);

const searchService = new SearchService(new ApiClient(THE_MOVIE_DB_API_KEY, $));
const resultComponentBuilder = new ResultComponentBuilder(columnsDefinition);

const searchHandler = () => {
    searchService.search(searchFieldEl.value).then(r => {
        "use strict";

        searchResultContainerEl.innerHTML = '';

        var html = resultComponentBuilder.build(r.results)
            .getHtml();

        searchResultContainerEl.innerHTML = html;
    });
};

searchButtonEl.addEventListener('click', searchHandler);
searchFieldEl.addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;

    if (key === 13) {
        searchHandler();
    }
});

