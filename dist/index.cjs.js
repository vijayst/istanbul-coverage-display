'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var libCoverage = _interopDefault(require('istanbul-lib-coverage'));
var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var React__default = _interopDefault(React);

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
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
        data: {},
        showGuide: false
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
      } else {
        this.setState({
          showGuide: true
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
      var _this$props = this.props,
          magic = _this$props.magic,
          onNavigate = _this$props.onNavigate;
      var _this$state = this.state,
          data = _this$state.data,
          showGuide = _this$state.showGuide;
      var position = this.getPosition();
      var showButtonStyle = Object.assign({}, BaseButtonStyle, position, {
        position: 'fixed',
        backgroundColor: 'red',
        zIndex: 10000,
        opacity: magic ? 0 : 1
      });
      var hideButtonStyle = Object.assign({}, BaseButtonStyle, {
        backgroundColor: 'rgba(0,0,0,.24)',
        marginLeft: 16,
        width: 90
      });
      return React__default.createElement("div", null, data.branches ? React__default.createElement("div", {
        style: Object.assign({
          padding: 20,
          backgroundColor: '#eee',
          position: 'fixed',
          zIndex: 10000
        }, this.getPosition(TablePadding))
      }, React__default.createElement("table", null, React__default.createElement("thead", null, React__default.createElement("tr", null, React__default.createElement("th", {
        width: "200"
      }), React__default.createElement("th", {
        width: "100"
      }))), React__default.createElement("tbody", null, React__default.createElement("tr", null, React__default.createElement("td", null, "Branch coverage:"), React__default.createElement("td", {
        align: "right"
      }, data.branches.pct, "% (", data.branches.total, ")")), React__default.createElement("tr", null, React__default.createElement("td", null, "Function coverage:"), React__default.createElement("td", {
        align: "right"
      }, data.functions.pct, "% (", data.functions.total, ")")), React__default.createElement("tr", null, React__default.createElement("td", null, "Line coverage:"), React__default.createElement("td", {
        align: "right"
      }, data.lines.pct, "% (", data.lines.total, ")")), React__default.createElement("tr", null, React__default.createElement("td", null, "Statement coverage:"), React__default.createElement("td", {
        align: "right"
      }, data.statements.pct, "% (", data.statements.total, ")")))), React__default.createElement("div", {
        style: {
          textAlign: 'right',
          marginTop: 12
        }
      }, onNavigate ? React__default.createElement("button", {
        style: hideButtonStyle,
        onClick: onNavigate
      }, "Details") : null, React__default.createElement("button", {
        style: hideButtonStyle,
        onClick: this.handleRefresh.bind(this)
      }, "Refresh"), React__default.createElement("button", {
        style: hideButtonStyle,
        onClick: this.handleClose.bind(this)
      }, "Close"))) : showGuide ? React__default.createElement("div", {
        style: Object.assign({
          padding: 20,
          backgroundColor: '#eee',
          position: 'fixed',
          zIndex: 10000,
          maxWidth: 400
        }, this.getPosition(TablePadding))
      }, React__default.createElement("p", null, "Please install babel-plugin-istanbul as devDependency. Add the plugin to .babelrc file or webpack config for instrumenting your code."), React__default.createElement("div", {
        style: {
          textAlign: 'right'
        }
      }, React__default.createElement("button", {
        style: hideButtonStyle,
        onClick: this.handleClose.bind(this)
      }, "Close"))) : null, React__default.createElement("button", {
        style: showButtonStyle,
        onClick: this.handleShow.bind(this)
      }, "Show coverage"));
    }
  }]);

  return Summary;
}(React.Component);
Summary.propTypes = {
  position: PropTypes.oneOf(['bottomLeft', 'topLeft', 'bottomRight', 'topRight']),
  magic: PropTypes.bool,
  onNavigate: PropTypes.func
};
Summary.defaultProps = {
  position: 'bottomLeft'
};

function Arrow(props) {
  var deg = props.down ? 180 : 0;
  return React__default.createElement("svg", _extends({
    viewBox: "0 0 32 32",
    fill: "currentColor",
    style: {
      transform: "rotate(".concat(deg, "deg)"),
      transition: 'transform 200ms ease-in-out'
    }
  }, props), React__default.createElement("path", {
    d: "M18.221 7.206l9.585 9.585a2.265 2.265 0 0 1 0 3.195l-.8.801a2.266 2.266 0 0 1-3.194 0l-7.315-7.315-7.315 7.315a2.266 2.266 0 0 1-3.194 0l-.8-.801a2.265 2.265 0 0 1 0-3.195l9.587-9.585a2.24 2.24 0 0 1 1.723-.647 2.247 2.247 0 0 1 1.723.647z",
    fill: "#515151"
  }));
}

var Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this));
    _this.state = {
      down: true
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: "handleToggle",
    value: function handleToggle() {
      this.setState({
        down: !this.state.down
      });
    }
  }, {
    key: "render",
    value: function render() {
      var down = this.state.down;
      return React__default.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center'
        },
        onClick: this.handleToggle.bind(this)
      }, React__default.createElement(Arrow, {
        width: "16",
        height: "16",
        down: down
      }), React__default.createElement("span", {
        style: {
          marginLeft: 8
        }
      }, "Heloo"));
    }
  }]);

  return Dropdown;
}(React.Component);

var TreeTable =
/*#__PURE__*/
function (_Component) {
  _inherits(TreeTable, _Component);

  function TreeTable() {
    _classCallCheck(this, TreeTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(TreeTable).apply(this, arguments));
  }

  _createClass(TreeTable, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      var root = data.find(function (d) {
        return d.id === 1;
      });
      return React__default.createElement("table", {
        className: "icd-table",
        border: "1",
        cellSpacing: "0",
        cellPadding: "8"
      }, React__default.createElement("thead", null, React__default.createElement("tr", null, React__default.createElement("th", {
        width: "300"
      }, "Folder / File"), React__default.createElement("th", {
        width: "300"
      }, "Path"), React__default.createElement("th", {
        width: "75"
      }, "Branches"), React__default.createElement("th", {
        width: "75"
      }, "Functions"), React__default.createElement("th", {
        width: "75"
      }, "Lines"), React__default.createElement("th", {
        width: "75"
      }, "Statements"))), React__default.createElement("tbody", null, React__default.createElement("tr", null, React__default.createElement("td", {
        style: {
          paddingLeft: 16
        }
      }, React__default.createElement(Dropdown, null)), React__default.createElement("td", {
        style: {
          paddingLeft: 16
        }
      }, root.path), React__default.createElement("td", {
        style: {
          textAlign: 'center'
        }
      }, root.data.branches.pct, "% (", root.data.branches.total, ")"), React__default.createElement("td", {
        style: {
          textAlign: 'center'
        }
      }, root.data.functions.pct, "% (", root.data.functions.total, ")"), React__default.createElement("td", {
        style: {
          textAlign: 'center'
        }
      }, root.data.lines.pct, "% (", root.data.lines.total, ")"), React__default.createElement("td", {
        style: {
          textAlign: 'center'
        }
      }, root.data.statements.pct, "% (", root.data.statements.total, ")"))));
    }
  }]);

  return TreeTable;
}(React.Component);
TreeTable.propTypes = {
  data: PropTypes.array
};

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
      return React__default.createElement("div", null, treeNodes.length ? React__default.createElement(TreeTable, {
        data: treeNodes
      }) : null);
    }
  }]);

  return CoverageDetail;
}(React.Component);

exports.getCoverage = getCoverage;
exports.CoverageSummary = Summary;
exports.CoverageDetail = CoverageDetail;
