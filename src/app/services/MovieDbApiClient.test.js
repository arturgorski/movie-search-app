import test from 'ava';
import * as sinon from 'sinon';

import {API_SEARCH_URL} from './../constants';
import MovieDbApiClient from './MovieDbApiClient';

const API_KEY = 'api-key';

let jqueryMock;

test.beforeEach(() => {
    jqueryMock = sinon.mock({
        get(){}
    });
});

test.afterEach(() => {
    jqueryMock.restore();
});

test('should make API call with given term', t => {
    // given
    t.plan(1);
    const apiClient = new MovieDbApiClient(API_KEY, jqueryMock.object);
    const searchTerm = 'movie title';
    jqueryMock.expects('get')
        .once()
        .withArgs(API_SEARCH_URL, {api_key: API_KEY, query: searchTerm});

    // when
    apiClient.search(searchTerm);

    // then
    t.true(jqueryMock.verify());
});

