'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var libCoverage = _interopDefault(require('istanbul-lib-coverage'));
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
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

function Arrow(_ref) {
  var className = _ref.className,
      down = _ref.down;
  var deg = down ? 180 : 0;
  return React__default.createElement("svg", {
    className: className,
    viewBox: "0 0 32 32",
    fill: "currentColor",
    style: {
      transform: "rotate(".concat(deg, "deg)"),
      transition: 'transform 200ms ease-in-out'
    }
  }, React__default.createElement("path", {
    d: "M18.221 7.206l9.585 9.585a2.265 2.265 0 0 1 0 3.195l-.8.801a2.266 2.266 0 0 1-3.194 0l-7.315-7.315-7.315 7.315a2.266 2.266 0 0 1-3.194 0l-.8-.801a2.265 2.265 0 0 1 0-3.195l9.587-9.585a2.24 2.24 0 0 1 1.723-.647 2.247 2.247 0 0 1 1.723.647z",
    fill: "#515151"
  }));
}
Arrow.propTypes = {
  down: PropTypes.bool
};

var Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown() {
    _classCallCheck(this, Dropdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).apply(this, arguments));
  }

  _createClass(Dropdown, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          text = _this$props.text,
          expanded = _this$props.expanded,
          onToggle = _this$props.onToggle;
      return React__default.createElement("span", {
        className: "dropdown",
        onClick: onToggle
      }, React__default.createElement(Arrow, {
        className: "dropdown__arrow",
        down: expanded
      }), React__default.createElement("span", {
        className: "dropdown__text"
      }, text));
    }
  }]);

  return Dropdown;
}(React.Component);
Dropdown.propTypes = {
  text: PropTypes.string,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func
};

var TreeTable =
/*#__PURE__*/
function (_Component) {
  _inherits(TreeTable, _Component);

  function TreeTable(props) {
    var _this;

    _classCallCheck(this, TreeTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeTable).call(this));
    var items = [];
    var root = props.data.find(function (d) {
      return d.id === 1;
    });

    if (root) {
      items.push({
        node: root,
        expanded: true
      });
      var children = props.data.filter(function (d) {
        return d.parentId === 1;
      });
      children.forEach(function (c) {
        items.push({
          node: c,
          expanded: false
        });
      });
    }

    _this.state = {
      items: items
    };
    return _this;
  }

  _createClass(TreeTable, [{
    key: "getChildrenCount",
    value: function getChildrenCount(item) {
      var _this2 = this;

      if (item.node.leaf) return 0;
      if (!item.expanded) return 0;
      var items = this.state.items;
      var children = items.filter(function (i) {
        return i.node.parentId === item.node.id;
      });
      var count = children.length;
      children.forEach(function (c) {
        count += _this2.getChildrenCount(c);
      });
      return count;
    }
  }, {
    key: "handleToggle",
    value: function handleToggle(id) {
      var items = this.state.items;
      var data = this.props.data;
      items = items.slice();
      var index = items.findIndex(function (i) {
        return i.node.id === id;
      });
      var item = items[index];

      if (item.expanded) {
        var count = this.getChildrenCount(item);
        items.splice(index + 1, count);
        items[index] = _objectSpread({}, items[index], {
          expanded: false
        });
        this.setState({
          items: items
        });
      } else {
        var _items;

        var children = data.filter(function (d) {
          return d.parentId === id;
        }).map(function (d) {
          return {
            node: d,
            expanded: false
          };
        });

        (_items = items).splice.apply(_items, [index + 1, 0].concat(_toConsumableArray(children)));

        items[index] = _objectSpread({}, items[index], {
          expanded: true
        });
        this.setState({
          items: items
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var items = this.state.items;
      return React__default.createElement("table", {
        className: "icd-table"
      }, React__default.createElement("thead", null, React__default.createElement("tr", null, React__default.createElement("th", {
        width: "300"
      }, "Folder / File"), React__default.createElement("th", {
        width: "300"
      }, "Path"), React__default.createElement("th", {
        width: "100"
      }, "Branches"), React__default.createElement("th", {
        width: "100"
      }, "Functions"), React__default.createElement("th", {
        width: "100"
      }, "Lines"), React__default.createElement("th", {
        width: "100"
      }, "Statements"))), React__default.createElement("tbody", null, items.map(function (item) {
        return React__default.createElement("tr", {
          key: item.node.id
        }, React__default.createElement("td", {
          style: {
            paddingLeft: 16 * (item.node.level + 1)
          }
        }, item.node.leaf ? item.node.name : React__default.createElement(Dropdown, {
          text: item.node.name,
          expanded: item.expanded,
          onToggle: _this3.handleToggle.bind(_this3, item.node.id)
        })), React__default.createElement("td", {
          style: {
            paddingLeft: 16
          }
        }, item.node.path), React__default.createElement("td", null, item.node.data.branches.pct, "% (", item.node.data.branches.total, ")"), React__default.createElement("td", null, item.node.data.functions.pct, "% (", item.node.data.functions.total, ")"), React__default.createElement("td", null, item.node.data.lines.pct, "% (", item.node.data.lines.total, ")"), React__default.createElement("td", null, item.node.data.statements.pct, "% (", item.node.data.statements.total, ")"));
      })));
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
