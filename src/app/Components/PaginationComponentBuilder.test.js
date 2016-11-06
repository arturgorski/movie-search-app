import test from 'ava';
import PaginationComponentBuilder from './PaginationComponentBuilder';

test('should create proper information about current page', t => {
    // given
    let builder = new PaginationComponentBuilder();
    t.plan(1);

    // when
    let summaryHtml = builder.addCurrentPageInfo(8, 4).getHtml();

    // then
    t.is(summaryHtml, '<span>Page 4 of 8</span>');
});

test('should create single pagination element', t => {
    // given
    let builder = new PaginationComponentBuilder();
    t.plan(1);

    // when
    let summaryHtml = builder.getPaginationEl(4, 4);

    // then
    t.is(summaryHtml, '<li class="current"><a href="" data-page="4">4</a></li>');
});

test('should create single pagination element', t => {
    // given
    let builder = new PaginationComponentBuilder();
    t.plan(1);

    // when
    let summaryHtml = builder.getPaginationEl(2, 5);

    // then
    t.is(summaryHtml, '<li><a href="" data-page="2">2</a></li>');
});

test('should create whole pagination element', t => {
    // given
    let builder = new PaginationComponentBuilder();
    t.plan(1);

    // when
    let summaryHtml = builder.addPagination(2, 1).getHtml();

    // then
    t.is(summaryHtml, '<ul class="pagination"><li class="current"><a href="" data-page="1">1</a></li><li><a href="" data-page="2">2</a></li></ul>');
});
