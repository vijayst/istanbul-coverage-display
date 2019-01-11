import libCoverage from 'istanbul-lib-coverage';

export default function getCoverage() {
    if (window.__coverage__ && libCoverage) {
        var map = libCoverage.createCoverageMap({});
        map.merge(window.__coverage__);
        let minSlashes = 100;
        const fileCoverages = Object.keys(map.data).map(key => {
            const slashes = key.split('/').length;
            if (slashes < minSlashes) {
                minSlashes = slashes;
            }
            return {
                key,
                data: map.data[key].toSummary().data
            };
        });
        return fileCoverages;
    }
    return null;
}
