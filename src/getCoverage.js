import libCoverage from 'istanbul-lib-coverage';

export default function getCoverage() {
    if (window.__coverage__ && libCoverage) {
        var map = libCoverage.createCoverageMap({});
        map.merge(window.__coverage__);
        return Object.keys(map.data).map(key => ({
            key,
            data: map.data[key].toSummary().data
        }));
    }
    return null;
}
