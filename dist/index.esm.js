import libCoverage from 'istanbul-lib-coverage';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TableTree from 'react-table-tree';

function getCoverage() {
  if (window.__coverage__ && libCoverage) {
    var map = libCoverage.createCoverageMap({});
    map.merge(window.__coverage__);
    return Object.keys(map.data).map(function (key) {
      return {
        key: key,
        data: map.data[key].toSummary().data
      };
    });
  }

  return null;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

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

function computeTotals(fileCoverages) {
  var data = getInitialData();
  fileCoverages.forEach(function (c) {
    data.branches.total += c.data.branches.total;
    data.branches.covered += c.data.branches.covered;
    data.functions.total += c.data.functions.total;
    data.functions.covered += c.data.functions.covered;
    data.lines.total += c.data.lines.total;
    data.lines.covered += c.data.lines.covered;
    data.statements.total += c.data.statements.total;
    data.statements.covered += c.data.statements.covered;
  });
  data.branches.pct = data.branches.total ? Math.round(data.branches.covered * 100 / data.branches.total) : 100;
  data.functions.pct = data.functions.total ? Math.round(data.functions.covered * 100 / data.functions.total) : 100;
  data.lines.pct = data.lines.total ? Math.round(data.lines.covered * 100 / data.lines.total) : 100;
  data.statements.pct = data.statements.total ? Math.round(data.statements.covered * 100 / data.statements.total) : 100;
  return data;
}

var BaseButtonStyle = {
  color: 'white',
  padding: '5px 10px',
  fontSize: 16,
  border: 0,
  borderRadius: 3
};
var TablePadding = 30;

var Summary =
/*#__PURE__*/
function (_Component) {
  _inherits(Summary, _Component);

  function Summary() {
    var _this;

    _classCallCheck(this, Summary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Summary).call(this));
    _this.state = {
      data: {}
    };
    return _this;
  }

  _createClass(Summary, [{
    key: "handleRefresh",
    value: function handleRefresh() {
      this.refresh();
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        data: {}
      });
    }
  }, {
    key: "handleShow",
    value: function handleShow() {
      this.refresh();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var fileCoverages = getCoverage();

      if (fileCoverages) {
        var data = computeTotals(fileCoverages);
        this.setState({
          data: data
        });
      }
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      var padding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var position = this.props.position;

      switch (position) {
        case 'topLeft':
          return {
            top: padding,
            left: 0
          };

        case 'bottomLeft':
          return {
            bottom: padding,
            left: 0
          };

        case 'topRight':
          return {
            top: padding,
            right: 0
          };

        case 'bottomRight':
          return {
            bottom: padding,
            right: 0
          };

        default:
          return {
            bottom: 0,
            left: 0
          };
      }
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.state.data;
      var position = this.getPosition();
      var showButtonStyle = Object.assign({}, BaseButtonStyle, position, {
        position: 'fixed',
        backgroundColor: 'red',
        zIndex: 10000
      });
      var hideButtonStyle = Object.assign({}, BaseButtonStyle, {
        backgroundColor: 'rgba(0,0,0,.24)',
        marginLeft: 16,
        width: 90
      });
      return React.createElement("div", null, data.branches ? React.createElement("div", {
        style: Object.assign({
          padding: 20,
          backgroundColor: '#eee',
          position: 'fixed',
          zIndex: 10000
        }, this.getPosition(TablePadding))
      }, React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
        width: "200"
      }), React.createElement("th", {
        width: "100"
      }))), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, "Branch coverage:"), React.createElement("td", {
        align: "right"
      }, data.branches.pct, "% (", data.branches.total, ")")), React.createElement("tr", null, React.createElement("td", null, "Function coverage:"), React.createElement("td", {
        align: "right"
      }, data.functions.pct, "% (", data.functions.total, ")")), React.createElement("tr", null, React.createElement("td", null, "Line coverage:"), React.createElement("td", {
        align: "right"
      }, data.lines.pct, "% (", data.lines.total, ")")), React.createElement("tr", null, React.createElement("td", null, "Statement coverage:"), React.createElement("td", {
        align: "right"
      }, data.statements.pct, "% (", data.statements.total, ")")))), React.createElement("div", {
        style: {
          textAlign: 'right',
          marginTop: 12
        }
      }, React.createElement("button", {
        style: hideButtonStyle,
        onClick: this.handleRefresh.bind(this)
      }, "Refresh"), React.createElement("button", {
        style: hideButtonStyle,
        onClick: this.handleClose.bind(this)
      }, "Close"))) : null, React.createElement("button", {
        style: showButtonStyle,
        onClick: this.handleShow.bind(this)
      }, "Show coverage"));
    }
  }]);

  return Summary;
}(Component);
Summary.propTypes = {
  position: PropTypes.oneOf(['bottomLeft', 'topLeft', 'bottomRight', 'topRight'])
};
Summary.defaultProps = {
  position: 'bottomLeft'
};

var columns = [{
  title: 'Folder / File',
  name: 'name',
  width: '100px'
}, {
  title: 'Path',
  name: 'path',
  width: '200px'
}, {
  title: 'Branches',
  name: 'branchPerc',
  textAlign: 'center',
  width: '100px'
}, {
  title: 'Functions',
  name: 'functionPerc',
  textAlign: 'center',
  width: '100px'
}, {
  title: 'Lines',
  name: 'linePerc',
  textAlign: 'center',
  width: '100px'
}, {
  title: 'Statements',
  name: 'stmtPerc',
  textAlign: 'center',
  width: '100px'
}];

var CoverageDetail =
/*#__PURE__*/
function (_Component) {
  _inherits(CoverageDetail, _Component);

  function CoverageDetail() {
    var _this;

    _classCallCheck(this, CoverageDetail);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CoverageDetail).call(this));
    _this.state = {
      treeNodes: []
    };
    return _this;
  }

  _createClass(CoverageDetail, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var fileCoverages = getCoverage();
      if (!fileCoverages) return;
      var minSlashes = 100;
      fileCoverages.forEach(function (fc) {
        var slashes = fc.key.split('/').length;
        if (slashes < minSlashes) minSlashes = slashes;
      });
      fileCoverages.forEach(function (fileCoverage) {
        var paths = fileCoverage.key.split('/').slice(minSlashes - 1);
        fileCoverage.path = paths.join('/');
        fileCoverage.parentPath = paths.length > 1 ? paths.slice(0, paths.length - 1).join('/') : rootPath;
        fileCoverage.level = paths.length;
        fileCoverage.name = paths[fileCoverage.level - 1];
        fileCoverage.paths = paths;
        fileCoverage.leaf = true;
      });
      var id = 1;
      var rootPath = '[Total]';
      var rootNode = {
        id: id++,
        path: rootPath,
        name: 'Total',
        level: 0
      };

      var treeData = _defineProperty({}, rootNode.path, rootNode);

      fileCoverages.forEach(function (fc) {
        fc.id = id++;

        if (fc.level === 1) {
          fc.parentId = 1;
          return;
        }

        var childNode = fc;

        for (var i = fc.level - 2; i >= 0; i--) {
          var paths = fc.paths.slice(0, i + 1);
          var path = paths.join('/');
          var node = treeData[path];

          if (!node) {
            node = {
              id: id++,
              path: path,
              parentPath: paths.length > 1 ? paths.slice(0, paths.length - 1).join('/') : rootPath,
              name: paths[paths.length - 1],
              parentId: 1,
              level: i + 1
            };
            treeData[path] = node;
          }

          childNode.parentId = node.id;
          childNode = node;
        }
      });
      var treeNodes = Object.values(treeData);
      treeNodes = treeNodes.concat(fileCoverages);
      treeNodes.sort(function (a, b) {
        return a.level < b.level ? 1 : a.level > b.level ? -1 : 0;
      });
      treeNodes.forEach(function (treeNode) {
        if (!treeNode.leaf) {
          var children = treeNodes.filter(function (n) {
            return n.parentId === treeNode.id;
          });
          treeNode.data = computeTotals(children);
        }

        var _treeNode$data = treeNode.data,
            branches = _treeNode$data.branches,
            functions = _treeNode$data.functions,
            lines = _treeNode$data.lines,
            statements = _treeNode$data.statements;
        treeNode.branchPerc = "".concat(branches.pct, "% (").concat(branches.total, ")");
        treeNode.functionPerc = "".concat(functions.pct, "% (").concat(functions.total, ")");
        treeNode.linePerc = "".concat(lines.pct, "% (").concat(lines.total, ")");
        treeNode.stmtPerc = "".concat(statements.pct, "% (").concat(statements.total, ")");
      });
      this.setState({
        treeNodes: treeNodes
      });
    }
  }, {
    key: "render",
    value: function render() {
      var treeNodes = this.state.treeNodes;
      return React.createElement("div", null, treeNodes.length ? React.createElement(TableTree, {
        datasets: treeNodes,
        columns: columns,
        rootId: 1,
        total: {
          visible: true,
          name: 'Totals'
        }
      }) : null);
    }
  }]);

  return CoverageDetail;
}(Component);

export { getCoverage, Summary as CoverageSummary, CoverageDetail };
