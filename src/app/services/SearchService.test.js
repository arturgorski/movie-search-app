import test from 'ava';
import * as sinon from 'sinon';

import SearchService from './SearchService';
import MovieDbApiClient from './MovieDbApiClient';

let apiMock;

test.beforeEach(() => {
    apiMock = sinon.mock(MovieDbApiClient.prototype);
});

test.afterEach(() => {
    apiMock.restore();
});

test('should call API client when non empty string is passed', t => {
    // given
    t.plan(1);
    const searchTerm = '  search term   ';
    const searchTermTrimmed = 'search term';
    apiMock.expects('search')
        .once()
        .withArgs(searchTermTrimmed);

    // when
    const searchService = new SearchService(apiMock.object);
    searchService.search(searchTerm);

    // then
    t.true(apiMock.verify());
});

test('should not call API client when empty string is passed', t => {
    // given
    t.plan(1);
    const searchTerm = '     ';
    apiMock.expects('search')
        .never();

    // when
    const searchService = new SearchService(apiMock.object);
    searchService.search(searchTerm);

    // then
    t.true(apiMock.verify());
});

test('should resolve returned promise with empty array', t => {
    // given
    t.plan(1);
    const searchTerm = '     ';

    // when
    const searchService = new SearchService(apiMock.object);
    let searchResult = searchService.search(searchTerm);

    // then
    return searchResult.then(moviesList => {
        t.deepEqual(moviesList, {results: []});
    });
});
