function getInitialSubData() {
    return {
        total: 0,
        covered: 0
    };
}

function getInitialData() {
    return {
        branches: getInitialSubData(),
        functions: getInitialSubData(),
        lines: getInitialSubData(),
        statements: getInitialSubData()
    };
}

export default function computeTotals(fileCoverages) {
    const data = getInitialData();
    fileCoverages.forEach(c => {
        data.branches.total += c.data.branches.total;
        data.branches.covered += c.data.branches.covered;
        data.functions.total += c.data.functions.total;
        data.functions.covered += c.data.functions.covered;
        data.lines.total += c.data.lines.total;
        data.lines.covered += c.data.lines.covered;
        data.statements.total += c.data.statements.total;
        data.statements.covered += c.data.statements.covered;
    });
    data.branches.pct = data.branches.total
        ? Math.round((data.branches.covered * 100) / data.branches.total)
        : 100;
    data.functions.pct = data.functions.total
        ? Math.round((data.functions.covered * 100) / data.functions.total)
        : 100;
    data.lines.pct = data.lines.total
        ? Math.round((data.lines.covered * 100) / data.lines.total)
        : 100;
    data.statements.pct = data.statements.total
        ? Math.round((data.statements.covered * 100) / data.statements.total)
        : 100;
    return data;
}
