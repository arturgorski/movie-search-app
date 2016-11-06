import test from 'ava';
import SummaryComponentBuilder from './SummaryComponentBuilder';

let results = {
    total_results: 42
};


test('should display proper information if found some records', t => {
    // given
    let builder = new SummaryComponentBuilder();
    t.plan(1);

    // when
    let summaryHtml = builder.build({total_results: 42}).getHtml();

    // then
    t.is(summaryHtml, '<h5>Records found: 42 </h5>');
});

test('should display proper information if no records found', t => {
    // given
    let builder = new SummaryComponentBuilder();
    t.plan(1);

    // when
    let summaryHtml = builder.build({total_results: 0}).getHtml();

    // then
    t.is(summaryHtml, '<h5>No records found :(</h5>');
});


