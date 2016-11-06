import test from 'ava';
import ResultComponentBuilder from './ResultComponentBuilder';

let results = [{
    prop1: 'r1p1',
    prop2: 'r1p2',
}, {
    prop1: 'r2p1',
    prop2: 'r2p2',
}];

let coulmnsDefinition = [{
    propertyName: 'prop1',
    headerTitle: 'Title 1',
    width: '100',
    formatter: value => `-${value}-`
}, {
    propertyName: 'prop2',
    headerTitle: 'Title 2'
}];

let expectedTbody = '<tbody><tr><td>-r1p1-</td><td>r1p2</td></tr><tr><td>-r2p1-</td><td>r2p2</td></tr></tbody>';
let expectedThead = '<thead><tr><th width="100">Title 1</th><th>Title 2</th></tr></thead>';

test('should create proper header cell', t => {
    // given
    let builder = new ResultComponentBuilder(coulmnsDefinition);
    t.plan(1);

    // when
    let headerCell = builder.getHeaderCell(coulmnsDefinition[0]);

    // then
    t.is(headerCell, '<th width="100">Title 1</th>');
});


test('should create proper header', t => {
    // given
    let builder = new ResultComponentBuilder(coulmnsDefinition);
    t.plan(1);

    // when
    let html = builder.addHeader(coulmnsDefinition).getHtml();

    // then
    t.is(html, expectedThead);
});


test('should create proper result cell', t => {
    // given
    let builder = new ResultComponentBuilder(coulmnsDefinition);
    t.plan(1);

    // when
    let html = builder.getResultCell(coulmnsDefinition[0], results[0]);

    // then
    t.is(html, '<td>-r1p1-</td>');
});

test('should create proper result row', t => {
    // given
    let builder = new ResultComponentBuilder(coulmnsDefinition);
    t.plan(1);

    // when
    let html = builder.getResultRow(coulmnsDefinition, results[0]);

    // then
    t.is(html, '<tr><td>-r1p1-</td><td>r1p2</td></tr>');
});

test('should create proper table body', t => {
    // given
    let builder = new ResultComponentBuilder(coulmnsDefinition);
    t.plan(1);

    // when
    let html = builder.addTableBody(coulmnsDefinition, results).getHtml();

    // then
    t.is(html, expectedTbody);
});

test('should build whole table', t => {
    // given
    let builder = new ResultComponentBuilder(coulmnsDefinition);
    t.plan(1);

    // when
    let html = builder.build(results).getHtml();

    // then
    t.is(html, `<table>${expectedThead}${expectedTbody}</table>`);
});
