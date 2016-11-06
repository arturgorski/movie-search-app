import 'core-js/es6';

if (process.env.ENV === 'development') {
    Error['stackTraceLimit'] = Infinity;
}
