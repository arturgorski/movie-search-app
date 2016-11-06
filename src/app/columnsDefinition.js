const columnsDefinition = [{
    propertyName: 'poster_path',
    headerTitle: '',
    width: '100',
    formatter: value => value ? `<img src="https://image.tmdb.org/t/p/w92/${value}" />` : ''
}, {
    propertyName: 'title',
    headerTitle: 'Title'
}, {
    propertyName: 'overview',
    headerTitle: 'Overview'
}, {
    propertyName: 'release_date',
    headerTitle: 'Release date',
    width: '150'
}, {
    propertyName: 'vote_average',
    headerTitle: 'Average rating',
    formatter: value => value || '-'
}];

export default columnsDefinition;
