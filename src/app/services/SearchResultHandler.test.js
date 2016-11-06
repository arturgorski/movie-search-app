import test from 'ava';
import * as sinon from 'sinon';

import SearchResultHandler from './SearchResultHandler';

import ResultComponentBuilder from './../Components/ResultComponentBuilder';
import SummaryComponentBuilder from './../Components/SummaryComponentBuilder';
import PaginationComponentBuilder from './../Components/PaginationComponentBuilder';

let resultComponentBuilderMock;
let summaryComponentBuilderMock;
let paginationComponentBuilderMock;

let searchResultContainerEl;
let searchResultSummaryContainerEl;
let paginationContainerEl;

let handler;

test.beforeEach(() => {
    resultComponentBuilderMock = sinon.mock(ResultComponentBuilder.prototype);
    summaryComponentBuilderMock = sinon.mock(SummaryComponentBuilder.prototype);
    paginationComponentBuilderMock = sinon.mock(PaginationComponentBuilder.prototype);
    searchResultContainerEl = {innerHTML: 'html'};
    searchResultSummaryContainerEl = {innerHTML: 'html'};
    paginationContainerEl = {innerHTML: 'html'};

    handler = new SearchResultHandler(
        searchResultContainerEl,
        searchResultSummaryContainerEl,
        paginationContainerEl,
        resultComponentBuilderMock.object,
        summaryComponentBuilderMock.object,
        paginationComponentBuilderMock.object
    )
});

test.afterEach(() => {
    resultComponentBuilderMock.restore();
    summaryComponentBuilderMock.restore();
    paginationComponentBuilderMock.restore();
});

test('should clear all containers', t => {
    // given
    t.plan(3);

    // when
    handler.clearAll();

    // then
    t.is(paginationContainerEl.innerHTML, '');
    t.is(searchResultSummaryContainerEl.innerHTML, '');
    t.is(searchResultContainerEl.innerHTML, '');
});
