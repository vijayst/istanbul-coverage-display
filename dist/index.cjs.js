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
    var fileCoverages = Object.keys(map.data).map(function (key) {
      var slashes = key.split('/').length;

      return {
        key: key,
        data: map.data[key].toSummary().data
      };
    });
    return fileCoverages;
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
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        data: {}
      });
    }
  }, {
    key: "handleShow",
    value: function handleShow() {
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
        backgroundColor: 'rgba(0,0,0,.24)'
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
  position: PropTypes.oneOf(['bottomLeft', 'topLeft', 'bottomRight', 'topRight'])
};
Summary.defaultProps = {
  position: 'bottomLeft'
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e(React__default);}(window,function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r});},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="tjUo")}({"+JPL":function(t,e,n){t.exports={default:n("+SFK"),__esModule:!0};},"+SFK":function(t,e,n){n("AUvm"),n("wgeU"),n("adOz"),n("dl0q"),t.exports=n("WEpk").Symbol;},"16Al":function(t,e,n){var r=n("WbBG");function o(){}t.exports=function(){function t(t,e,n,o,i,u){if(u!==r){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e};return n.checkPropTypes=o,n.PropTypes=n,n};},"17x9":function(t,e,n){t.exports=n("16Al")();},"1p19":function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=u(n("cDcd")),o=u(n("17x9")),i=u(n("BDeE"));function u(t){return t&&t.__esModule?t:{default:t}}function a(t){var e=t.columns,n=t.dataset,o=t.total;return r.default.createElement("div",{className:i.default.row},e.map(function(t,e){var u={textAlign:t.textAlign||"left"};t.width&&(u.flexGrow=0,u.flexShrink=0,u.flexBasis=t.width);var a=t.bodyRender?t.bodyRender(n):n[t.name];return r.default.createElement("div",{key:e,className:i.default.column_item,style:u},0===e?r.default.createElement("span",{className:i.default.total},o.name):a)}))}a.propTypes={columns:o.default.arrayOf(o.default.shape({title:o.default.string.isRequired,name:o.default.string.isRequired,textAlign:o.default.oneOf(["left","center","right"]),bodyRender:o.default.func})).isRequired,dataset:o.default.object.isRequired,total:o.default.shape({name:o.default.string.isRequired}).isRequired},e.default=a;},"29s/":function(t,e,n){var r=n("WEpk"),o=n("5T2Y"),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n("uOPS")?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"});},"2GTP":function(t,e,n){var r=n("eaoh");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}};},"2Nb0":function(t,e,n){n("FlQf"),n("bBy9"),t.exports=n("zLkG").f("iterator");},"2faE":function(t,e,n){var r=n("5K7Z"),o=n("eUtF"),i=n("G8Mo"),u=Object.defineProperty;e.f=n("jmDH")?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return "value"in n&&(t[e]=n.value),t};},"3GJH":function(t,e,n){n("lCc8");var r=n("WEpk").Object;t.exports=function(t,e){return r.create(t,e)};},"3VFF":function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=l(n("iCc5")),o=l(n("V7oC")),i=l(n("FYw3")),u=l(n("mRg0")),a=l(n("cDcd")),s=l(n("17x9")),f=l(n("BNZj"));function l(t){return t&&t.__esModule?t:{default:t}}var c=function(t){function e(t){(0, r.default)(this,e);var n=(0, i.default)(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.detector=function(){var t=n.props,e=t.header,r=t.tableTree;if(r.offsetTop<=window.pageYOffset+e.top){var o=+window.getComputedStyle(r).width.slice(0,-2);n.setState({positionValue:"fixed",width:o,zIndex:10});}else n.setState({positionValue:"static",width:"auto",zIndex:0});},n.state={positionValue:"static",width:"auto",zIndex:0},n}return (0, u.default)(e,t),(0, o.default)(e,[{key:"componentDidMount",value:function(){this.props.header.fixed&&document.addEventListener("scroll",this.detector);}},{key:"componentWillUnmount",value:function(){this.props.header.fixed&&document.removeEventListener("scroll",this.detector);}},{key:"render",value:function(){var t=this,e=this.props,n=e.columns,r=e.header,o=this.state,i=o.positionValue,u=o.width,s=o.zIndex,l={position:i,top:r.top,width:u,zIndex:s};return a.default.createElement("div",{ref:function(e){t.header=e;},style:l},a.default.createElement("div",{className:f.default.title},n.map(function(t,e){var n={textAlign:t.textAlign||"left"};return t.width&&(n.flexGrow=0,n.flexShrink=0,n.flexBasis=t.width),a.default.createElement("span",{key:e,className:f.default.column_title,style:n},t.title)})))}}]),e}(a.default.Component);c.propTypes={columns:s.default.arrayOf(s.default.shape({title:s.default.string.isRequired,name:s.default.string.isRequired,textAlign:s.default.oneOf(["left","center","right"]),width:s.default.string})).isRequired,header:s.default.shape({fixed:s.default.bool.isRequired,top:s.default.number.isRequired}).isRequired,tableTree:s.default.object.isRequired},e.default=c;},"3VhM":function(t,e,n){var r=n("3f+I");"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(r,o);r.locals&&(t.exports=r.locals);},"3f+I":function(t,e,n){(e=t.exports=n("I1BE")(!1)).push([t.i,"\n\n._1bN5VNfsvzZZJH0jR4Rqg9 {\n\n}\n\n._1_l6pfG9NqOiudx_TEKnIZ {\n  background-color: #fff;\n  border-bottom: 1px solid #e5e5e5;\n  padding: 13px 10px 13px;\n  text-align: center;\n}\n",""]),e.locals={layout:"_1bN5VNfsvzZZJH0jR4Rqg9",row:"_1_l6pfG9NqOiudx_TEKnIZ"};},"5K7Z":function(t,e,n){var r=n("93I4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t};},"5T2Y":function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n);},"5qh/":function(t,e,n){var r=n("J/IS");"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(r,o);r.locals&&(t.exports=r.locals);},"5vMV":function(t,e,n){var r=n("B+OT"),o=n("NsO/"),i=n("W070")(!1),u=n("VVlx")("IE_PROTO");t.exports=function(t,e){var n,a=o(t),s=0,f=[];for(n in a)n!=u&&r(a,n)&&f.push(n);for(;e.length>s;)r(a,n=e[s++])&&(~i(f,n)||f.push(n));return f};},"6/1s":function(t,e,n){var r=n("YqAc")("meta"),o=n("93I4"),i=n("B+OT"),u=n("2faE").f,a=0,s=Object.isExtensible||function(){return !0},f=!n("KUxP")(function(){return s(Object.preventExtensions({}))}),l=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}});},c=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return "symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!s(t))return "F";if(!e)return "E";l(t);}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!s(t))return !0;if(!e)return !1;l(t);}return t[r].w},onFreeze:function(t){return f&&c.NEED&&s(t)&&!i(t,r)&&l(t),t}};},"6tYh":function(t,e,n){var r=n("93I4"),o=n("5K7Z"),i=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{(r=n("2GTP")(Function.call,n("vwuL").f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array);}catch(t){e=!0;}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:i};},"93I4":function(t,e){t.exports=function(t){return "object"==typeof t?null!==t:"function"==typeof t};},"9tPo":function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})};},A5Xg:function(t,e,n){var r=n("NsO/"),o=n("ar/p").f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(r(t))};},AJwV:function(t,e,n){(e=t.exports=n("I1BE")(!1)).push([t.i,"\n\n._3JqwPIKwM0hNDz6o5_RWbI {\n  display: flex;\n  flex-wrap: nowrap;\n  height: 40px;\n  background-color: #f2f2f2;\n  border-bottom: 1px solid #e5e5e5;\n  padding: 0 10px;\n}\n\n.ChiPpnWH94RQa9VngHrWM {\n  flex: 1 1 75px;\n  line-height: 40px;\n  font-size: 12px;\n  color: #333;\n}\n",""]),e.locals={title:"_3JqwPIKwM0hNDz6o5_RWbI",column_title:"ChiPpnWH94RQa9VngHrWM",columnTitle:"ChiPpnWH94RQa9VngHrWM"};},AUvm:function(t,e,n){var r=n("5T2Y"),o=n("B+OT"),i=n("jmDH"),u=n("Y7ZC"),a=n("kTiW"),s=n("6/1s").KEY,f=n("KUxP"),l=n("29s/"),c=n("RfKB"),d=n("YqAc"),p=n("UWiX"),h=n("zLkG"),v=n("Zxgi"),y=n("R+7+"),m=n("kAMH"),b=n("5K7Z"),g=n("93I4"),x=n("NsO/"),_=n("G8Mo"),O=n("rr1i"),w=n("oVml"),E=n("A5Xg"),j=n("vwuL"),S=n("2faE"),M=n("w6GO"),R=j.f,P=S.f,T=E.f,k=r.Symbol,I=r.JSON,N=I&&I.stringify,C=p("_hidden"),q=p("toPrimitive"),U={}.propertyIsEnumerable,A=l("symbol-registry"),B=l("symbols"),L=l("op-symbols"),F=Object.prototype,D="function"==typeof k,V=r.QObject,K=!V||!V.prototype||!V.prototype.findChild,H=i&&f(function(){return 7!=w(P({},"a",{get:function(){return P(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=R(F,e);r&&delete F[e],P(t,e,n),r&&t!==F&&P(F,e,r);}:P,W=function(t){var e=B[t]=w(k.prototype);return e._k=t,e},G=D&&"symbol"==typeof k.iterator?function(t){return "symbol"==typeof t}:function(t){return t instanceof k},J=function(t,e,n){return t===F&&J(L,e,n),b(t),e=_(e,!0),b(n),o(B,e)?(n.enumerable?(o(t,C)&&t[C][e]&&(t[C][e]=!1),n=w(n,{enumerable:O(0,!1)})):(o(t,C)||P(t,C,O(1,{})),t[C][e]=!0),H(t,e,n)):P(t,e,n)},Z=function(t,e){b(t);for(var n,r=y(e=x(e)),o=0,i=r.length;i>o;)J(t,n=r[o++],e[n]);return t},z=function(t){var e=U.call(this,t=_(t,!0));return !(this===F&&o(B,t)&&!o(L,t))&&(!(e||!o(this,t)||!o(B,t)||o(this,C)&&this[C][t])||e)},Y=function(t,e){if(t=x(t),e=_(e,!0),t!==F||!o(B,e)||o(L,e)){var n=R(t,e);return !n||!o(B,e)||o(t,C)&&t[C][e]||(n.enumerable=!0),n}},Q=function(t){for(var e,n=T(x(t)),r=[],i=0;n.length>i;)o(B,e=n[i++])||e==C||e==s||r.push(e);return r},X=function(t){for(var e,n=t===F,r=T(n?L:x(t)),i=[],u=0;r.length>u;)!o(B,e=r[u++])||n&&!o(F,e)||i.push(B[e]);return i};D||(a((k=function(){if(this instanceof k)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===F&&e.call(L,n),o(this,C)&&o(this[C],t)&&(this[C][t]=!1),H(this,t,O(1,n));};return i&&K&&H(F,t,{configurable:!0,set:e}),W(t)}).prototype,"toString",function(){return this._k}),j.f=Y,S.f=J,n("ar/p").f=E.f=Q,n("NV0k").f=z,n("mqlF").f=X,i&&!n("uOPS")&&a(F,"propertyIsEnumerable",z,!0),h.f=function(t){return W(p(t))}),u(u.G+u.W+u.F*!D,{Symbol:k});for(var $="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;$.length>tt;)p($[tt++]);for(var et=M(p.store),nt=0;et.length>nt;)v(et[nt++]);u(u.S+u.F*!D,"Symbol",{for:function(t){return o(A,t+="")?A[t]:A[t]=k(t)},keyFor:function(t){if(!G(t))throw TypeError(t+" is not a symbol!");for(var e in A)if(A[e]===t)return e},useSetter:function(){K=!0;},useSimple:function(){K=!1;}}),u(u.S+u.F*!D,"Object",{create:function(t,e){return void 0===e?w(t):Z(w(t),e)},defineProperty:J,defineProperties:Z,getOwnPropertyDescriptor:Y,getOwnPropertyNames:Q,getOwnPropertySymbols:X}),I&&u(u.S+u.F*(!D||f(function(){var t=k();return "[null]"!=N([t])||"{}"!=N({a:t})||"{}"!=N(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(g(e)||void 0!==t)&&!G(t))return m(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!G(e))return e}),r[1]=e,N.apply(I,r)}}),k.prototype[q]||n("NegM")(k.prototype,q,k.prototype.valueOf),c(k,"Symbol"),c(Math,"Math",!0),c(r.JSON,"JSON",!0);},Al62:function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});e.dfs=function(t,e,n){!function t(r){n(r);var o=r.__sub;if(!o||0!==o.length)for(var i=0;i<o.length;i++)t(e[o[i]]);}(t);};},AyUB:function(t,e,n){t.exports={default:n("3GJH"),__esModule:!0};},"B+OT":function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)};},BDeE:function(t,e,n){var r=n("mzPE");"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(r,o);r.locals&&(t.exports=r.locals);},BNZj:function(t,e,n){var r=n("AJwV");"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(r,o);r.locals&&(t.exports=r.locals);},D8kY:function(t,e,n){var r=n("Ojgd"),o=Math.max,i=Math.min;t.exports=function(t,e){return (t=r(t))<0?o(t+e,0):i(t,e)};},EJiy:function(t,e,n){e.__esModule=!0;var r=u(n("F+2o")),o=u(n("+JPL")),i="function"==typeof o.default&&"symbol"==typeof r.default?function(t){return typeof t}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default&&t!==o.default.prototype?"symbol":typeof t};function u(t){return t&&t.__esModule?t:{default:t}}e.default="function"==typeof o.default&&"symbol"===i(r.default)?function(t){return void 0===t?"undefined":i(t)}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default&&t!==o.default.prototype?"symbol":void 0===t?"undefined":i(t)};},"F+2o":function(t,e,n){t.exports={default:n("2Nb0"),__esModule:!0};},FYw3:function(t,e,n){e.__esModule=!0;var r=function(t){return t&&t.__esModule?t:{default:t}}(n("EJiy"));e.default=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!==(void 0===e?"undefined":(0, r.default)(e))&&"function"!=typeof e?t:e};},FlQf:function(t,e,n){var r=n("ccE7")(!0);n("MPFp")(String,"String",function(t){this._t=String(t),this._i=0;},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})});},FpHa:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");},G8Mo:function(t,e,n){var r=n("93I4");t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")};},Hfiw:function(t,e,n){var r=n("Y7ZC");r(r.S,"Object",{setPrototypeOf:n("6tYh").set});},Hsns:function(t,e,n){var r=n("93I4"),o=n("5T2Y").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}};},I1BE:function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=function(t){return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(r),i=r.sources.map(function(t){return "/*# sourceURL="+r.sourceRoot+t+" */"});return [n].concat(i).concat([o]).join("\n")}return [n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0);}for(o=0;o<t.length;o++){var u=t[o];"number"==typeof u[0]&&r[u[0]]||(n&&!u[2]?u[2]=n:n&&(u[2]="("+u[2]+") and ("+n+")"),e.push(u));}},e};},"J/IS":function(t,e,n){(e=t.exports=n("I1BE")(!1)).push([t.i,"\n\n._1pNDgKGxjyeTtZSt9n0ZAV {\n  display: flex;\n  flex-wrap: nowrap;\n  background-color: #fff;\n  border-bottom: 1px solid #e5e5e5;\n  padding: 13px 10px 13px;\n}\n\n.FBIs-t1ZQB0AhhIzs8E6h {\n  overflow: hidden;\n}\n\n._1X1HEjJKnMW4PPFOvC5iHI {\n  float: left;\n}\n\n.UbpLT6or4D8IiVzdN8tgR {\n  flex: 1 1 75px;\n  line-height: 20px;\n  font-size: 12px;\n  color: #333;\n}\n\n._2P0gF_OIlKp_WSsUPvnrqx {\n  margin-right: 8px;\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  box-sizing: border-box;\n  cursor: pointer;\n  background: #fff;\n  border: 1px solid #999;\n  border-radius: 2px;\n  line-height: 10px;\n  font-size: 0px;\n  vertical-align: middle;\n}\n\n._2DTgXFpsjdl6I7QwbK_JFs {\n  font-size: 0;\n}\n\n._2BDXPKBzM5c_8d5ayFHZ-K:after{\n  display: inline-block;\n  content: '+';\n  width: 10px;\n  height: 10px;\n  text-align: center;\n  color: #333;\n  font-size: 14px;\n  line-height: 8px;\n}\n\n._25XD8_bRVdSr5IS3mGsDn6:after{\n  display: inline-block;\n  content: '-';\n  width: 10px;\n  text-align: center;\n  color: #333;\n  font-size: 14px;\n  line-height: 9px;\n}\n",""]),e.locals={row:"_1pNDgKGxjyeTtZSt9n0ZAV",firstColumn:"FBIs-t1ZQB0AhhIzs8E6h",firstColumnPart:"_1X1HEjJKnMW4PPFOvC5iHI",column_item:"UbpLT6or4D8IiVzdN8tgR",columnItem:"UbpLT6or4D8IiVzdN8tgR",expandIcon:"_2P0gF_OIlKp_WSsUPvnrqx",expandWrap:"_2DTgXFpsjdl6I7QwbK_JFs",plus:"_2BDXPKBzM5c_8d5ayFHZ-K",minus:"_25XD8_bRVdSr5IS3mGsDn6"};},JB68:function(t,e,n){var r=n("Jes0");t.exports=function(t){return Object(r(t))};},JMke:function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=a(n("cDcd")),o=a(n("17x9")),i=a(n("TSYQ")),u=a(n("5qh/"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t){var e=t.columns,n=t.rowKey,o=t.dataset,a=o.__iconPlus,s=(0, i.default)(a?u.default.plus:u.default.minus,u.default.expandIcon),f=function(){t.handleExpandIconClick(o[n]);};return r.default.createElement("div",{key:o[n],className:u.default.row},e.map(function(t,e){var n={textAlign:t.textAlign||"left"};t.width&&(n.flexGrow=0,n.flexShrink=0,n.flexBasis=t.width);var a={};a.marginLeft=20*(o.__level-1)+"px";var l=t.bodyRender?t.bodyRender(o):o[t.name],c=(0, i.default)(u.default.expandWrap,u.default.firstColumnPart);return r.default.createElement("div",{key:e,className:u.default.column_item,style:n},0===e?r.default.createElement("div",{className:u.default.firstColumn,style:a},r.default.createElement("div",{className:c},r.default.createElement("span",{className:s,onClick:f})),r.default.createElement("div",{className:u.default.firstColumnPart},l)):l)}))}s.propTypes={columns:o.default.arrayOf(o.default.shape({title:o.default.string.isRequired,name:o.default.string.isRequired,textAlign:o.default.oneOf(["left","center","right"]),bodyRender:o.default.func})).isRequired,rowKey:o.default.string.isRequired,dataset:o.default.object.isRequired,handleExpandIconClick:o.default.func.isRequired},e.default=s;},JbBM:function(t,e,n){n("Hfiw"),t.exports=n("WEpk").Object.setPrototypeOf;},Jes0:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t};},KUxP:function(t,e){t.exports=function(t){try{return !!t()}catch(t){return !0}};},M1xp:function(t,e,n){var r=n("a0xu");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return "String"==r(t)?t.split(""):Object(t)};},MPFp:function(t,e,n){var r=n("uOPS"),o=n("Y7ZC"),i=n("kTiW"),u=n("NegM"),a=n("SBuE"),s=n("j2DC"),f=n("RfKB"),l=n("U+KD"),c=n("UWiX")("iterator"),d=!([].keys&&"next"in[].keys()),p=function(){return this};t.exports=function(t,e,n,h,v,y,m){s(n,e,h);var b,g,x,_=function(t){if(!d&&t in j)return j[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},O=e+" Iterator",w="values"==v,E=!1,j=t.prototype,S=j[c]||j["@@iterator"]||v&&j[v],M=S||_(v),R=v?w?_("entries"):M:void 0,P="Array"==e&&j.entries||S;if(P&&(x=l(P.call(new t)))!==Object.prototype&&x.next&&(f(x,O,!0),r||"function"==typeof x[c]||u(x,c,p)),w&&S&&"values"!==S.name&&(E=!0,M=function(){return S.call(this)}),r&&!m||!d&&!E&&j[c]||u(j,c,M),a[e]=M,a[O]=p,v)if(b={values:w?M:_("values"),keys:y?M:_("keys"),entries:R},m)for(g in b)g in j||i(j,g,b[g]);else o(o.P+o.F*(d||E),e,b);return b};},MvwC:function(t,e,n){var r=n("5T2Y").document;t.exports=r&&r.documentElement;},NV0k:function(t,e){e.f={}.propertyIsEnumerable;},NegM:function(t,e,n){var r=n("2faE"),o=n("rr1i");t.exports=n("jmDH")?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t};},"NsO/":function(t,e,n){var r=n("M1xp"),o=n("Jes0");t.exports=function(t){return r(o(t))};},Ojgd:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)};},P2sY:function(t,e,n){t.exports={default:n("UbbE"),__esModule:!0};},QbLZ:function(t,e,n){e.__esModule=!0;var r=function(t){return t&&t.__esModule?t:{default:t}}(n("P2sY"));e.default=r.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r]);}return t};},"R+7+":function(t,e,n){var r=n("w6GO"),o=n("mqlF"),i=n("NV0k");t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,a=n(t),s=i.f,f=0;a.length>f;)s.call(t,u=a[f++])&&e.push(u);return e};},"RU/L":function(t,e,n){n("Rqdy");var r=n("WEpk").Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)};},RfKB:function(t,e,n){var r=n("2faE").f,o=n("B+OT"),i=n("UWiX")("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e});};},Rqdy:function(t,e,n){var r=n("Y7ZC");r(r.S+r.F*!n("jmDH"),"Object",{defineProperty:n("2faE").f});},SBuE:function(t,e){t.exports={};},SEkw:function(t,e,n){t.exports={default:n("RU/L"),__esModule:!0};},TSYQ:function(t,e,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){var n={}.hasOwnProperty;function o(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var i=typeof r;if("string"===i||"number"===i)t.push(r);else if(Array.isArray(r)&&r.length){var u=o.apply(null,r);u&&t.push(u);}else if("object"===i)for(var a in r)n.call(r,a)&&r[a]&&t.push(a);}}return t.join(" ")}void 0!==t&&t.exports?(o.default=o,t.exports=o):void 0===(r=function(){return o}.apply(e,[]))||(t.exports=r);}();},"U+KD":function(t,e,n){var r=n("B+OT"),o=n("JB68"),i=n("VVlx")("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null};},UO39:function(t,e){t.exports=function(t,e){return {value:e,done:!!t}};},UWiX:function(t,e,n){var r=n("29s/")("wks"),o=n("YqAc"),i=n("5T2Y").Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r;},UbbE:function(t,e,n){n("o8NH"),t.exports=n("WEpk").Object.assign;},V7oC:function(t,e,n){e.__esModule=!0;var r=function(t){return t&&t.__esModule?t:{default:t}}(n("SEkw"));e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0, r.default)(t,o.key,o);}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();},VVlx:function(t,e,n){var r=n("29s/")("keys"),o=n("YqAc");t.exports=function(t){return r[t]||(r[t]=o(t))};},W070:function(t,e,n){var r=n("NsO/"),o=n("tEej"),i=n("D8kY");t.exports=function(t){return function(e,n,u){var a,s=r(e),f=o(s.length),l=i(u,f);if(t&&n!=n){for(;f>l;)if((a=s[l++])!=a)return !0}else for(;f>l;l++)if((t||l in s)&&s[l]===n)return t||l||0;return !t&&-1}};},WEpk:function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n);},WbBG:function(t,e,n){t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";},Wwog:function(t,e,n){n.r(e);var r=function(t,e){return t===e};e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r,n=void 0,o=[],i=void 0,u=!1,a=function(t,n){return e(t,o[n])};return function(){for(var e=arguments.length,r=Array(e),s=0;s<e;s++)r[s]=arguments[s];return u&&n===this&&r.length===o.length&&r.every(a)?i:(u=!0,n=this,o=r,i=t.apply(this,r))}};},Y7ZC:function(t,e,n){var r=n("5T2Y"),o=n("WEpk"),i=n("2GTP"),u=n("NegM"),a=n("B+OT"),s=function(t,e,n){var f,l,c,d=t&s.F,p=t&s.G,h=t&s.S,v=t&s.P,y=t&s.B,m=t&s.W,b=p?o:o[e]||(o[e]={}),g=b.prototype,x=p?r:h?r[e]:(r[e]||{}).prototype;for(f in p&&(n=e),n)(l=!d&&x&&void 0!==x[f])&&a(b,f)||(c=l?x[f]:n[f],b[f]=p&&"function"!=typeof x[f]?n[f]:y&&l?i(c,r):m&&x[f]==c?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(c):v&&"function"==typeof c?i(Function.call,c):c,v&&((b.virtual||(b.virtual={}))[f]=c,t&s.R&&g&&!g[f]&&u(g,f,c)));};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s;},YqAc:function(t,e){var n=0,r=Math.random();t.exports=function(t){return "Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))};},Zxgi:function(t,e,n){var r=n("5T2Y"),o=n("WEpk"),i=n("uOPS"),u=n("zLkG"),a=n("2faE").f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:u.f(t)});};},a0xu:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)};},"aET+":function(t,e,n){var r={},o=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),i=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t){return document.querySelector(t)}.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head;}catch(t){n=null;}e[t]=n;}return e[t]}}(),u=null,a=0,s=[],f=n("9tPo");function l(t,e){for(var n=0;n<t.length;n++){var o=t[n],i=r[o.id];if(i){i.refs++;for(var u=0;u<i.parts.length;u++)i.parts[u](o.parts[u]);for(;u<o.parts.length;u++)i.parts.push(y(o.parts[u],e));}else{var a=[];for(u=0;u<o.parts.length;u++)a.push(y(o.parts[u],e));r[o.id]={id:o.id,refs:1,parts:a};}}}function c(t,e){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],u=e.base?i[0]+e.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};r[u]?r[u].parts.push(a):n.push(r[u]={id:u,parts:[a]});}return n}function d(t,e){var n=i(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=s[s.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),s.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=i(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,o);}}function p(t){if(null===t.parentNode)return !1;t.parentNode.removeChild(t);var e=s.indexOf(t);e>=0&&s.splice(e,1);}function h(t){var e=document.createElement("style");return void 0===t.attrs.type&&(t.attrs.type="text/css"),v(e,t.attrs),d(t,e),e}function v(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n]);});}function y(t,e){var n,r,o,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i;}if(e.singleton){var s=a++;n=u||(u=h(e)),r=b.bind(null,n,s,!1),o=b.bind(null,n,s,!0);}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",v(e,t.attrs),d(t,e),e}(e),r=function(t,e,n){var r=n.css,o=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=f(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var u=new Blob([r],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(u),a&&URL.revokeObjectURL(a);}.bind(null,n,e),o=function(){p(n),n.href&&URL.revokeObjectURL(n.href);}):(n=h(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n));}}.bind(null,n),o=function(){p(n);});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e);}else o();}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=o()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=c(t,e);return l(n,e),function(t){for(var o=[],i=0;i<n.length;i++){var u=n[i];(a=r[u.id]).refs--,o.push(a);}t&&l(c(t,e),e);for(i=0;i<o.length;i++){var a;if(0===(a=o[i]).refs){for(var s=0;s<a.parts.length;s++)a.parts[s]();delete r[a.id];}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function b(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=m(e,o);else{var i=document.createTextNode(o),u=t.childNodes;u[e]&&t.removeChild(u[e]),u.length?t.insertBefore(i,u[e]):t.appendChild(i);}}},adOz:function(t,e,n){n("Zxgi")("asyncIterator");},"ar/p":function(t,e,n){var r=n("5vMV"),o=n("FpHa").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)};},"bB/k":function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=v(n("iCc5")),o=v(n("FYw3")),i=v(n("V7oC")),u=v(n("mRg0")),a=v(n("cDcd")),s=v(n("17x9")),f=v(n("TSYQ")),l=v(n("JMke")),c=v(n("3VFF")),d=v(n("1p19")),p=v(n("3VhM")),h=n("Al62");function v(t){return t&&t.__esModule?t:{default:t}}var y=function(t){function e(t){(0, r.default)(this,e);var n=(0, o.default)(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.handleExpandIconClick=function(t){var e=n.state,r=e.datasetsMap,o=e.datasets,i=r[t];i.__leaf||(!1===i.__iconPlus?(i.__iconPlus=!0,(0, h.dfs)(i,r,function(t){return t.__display=!1}),i.__display=!0):(i.__iconPlus=!1,i.__sub.forEach(function(t){var e=r[t];e.__display=!0,!0===e.__leaf?e.__iconPlus=!1:e.__iconPlus=!0;})));var u=o.slice();n.setState({datasets:u});},n.state={datasets:n.props.datasets,datasetsMap:n.props.datasetsMap},n.tableTree={},n}return (0, u.default)(e,t),(0, i.default)(e,null,[{key:"getDerivedStateFromProps",value:function(t,e){return t.datasets!==e.datasets?{datasets:t.datasets,datasetsMap:t.datasetsMap}:null}}]),(0, i.default)(e,[{key:"render",value:function(){var t=this,e=this.props,n=e.columns,r=e.rowKey,o=e.loading,i=e.total,u=e.rootId,s=e.header,h=e.style,v=e.className,y=this.state,m=y.datasets,b=y.datasetsMap,g=m.filter(function(t){return t.__display}).map(function(t){return b[t.id]}),x=b[u],_=(0, f.default)(p.default.layout,v);return a.default.createElement("div",{className:_,style:h,ref:function(e){t.tableTree=e;}},a.default.createElement(c.default,{columns:n,header:s,tableTree:this.tableTree}),o?a.default.createElement(o,null):0===g.length?a.default.createElement("div",{className:p.default.row},"没有更多数据了"):g.map(function(e,o){return a.default.createElement(l.default,{key:o,columns:n,dataset:e,rowKey:r,handleExpandIconClick:t.handleExpandIconClick})}),i.visible&&x?a.default.createElement(d.default,{total:i,columns:n,dataset:x}):null)}}]),e}(a.default.Component);y.propTypes={columns:s.default.arrayOf(s.default.shape({title:s.default.string.isRequired,name:s.default.string.isRequired,textAlign:s.default.oneOf(["left","center","right"]),bodyRender:s.default.func})).isRequired,datasets:s.default.arrayOf(s.default.shape({__display:s.default.bool.isRequired,__iconPlus:s.default.bool.isRequired,__leaf:s.default.bool.isRequired,__sub:s.default.array.isRequired}).isRequired),datasetsMap:s.default.object.isRequired,rowKey:s.default.string.isRequired,loading:s.default.oneOf([s.default.bool,s.default.element]).isRequired,rootId:s.default.number.isRequired,total:s.default.shape({visible:s.default.bool.isRequired,name:s.default.string.isRequired}).isRequired,header:s.default.shape({fixed:s.default.bool.isRequired,top:s.default.number.isRequired}).isRequired,style:s.default.object.isRequired,className:s.default.string.isRequired},y.defaultProps={datasets:[]},e.default=y;},bBy9:function(t,e,n){n("w2d+");for(var r=n("5T2Y"),o=n("NegM"),i=n("SBuE"),u=n("UWiX")("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),s=0;s<a.length;s++){var f=a[s],l=r[f],c=l&&l.prototype;c&&!c[u]&&o(c,u,f),i[f]=i.Array;}},cDcd:function(e,n){e.exports=t;},ccE7:function(t,e,n){var r=n("Ojgd"),o=n("Jes0");t.exports=function(t){return function(e,n){var i,u,a=String(o(e)),s=r(n),f=a.length;return s<0||s>=f?t?"":void 0:(i=a.charCodeAt(s))<55296||i>56319||s+1===f||(u=a.charCodeAt(s+1))<56320||u>57343?t?a.charAt(s):i:t?a.slice(s,s+2):u-56320+(i-55296<<10)+65536}};},dWTY:function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=p(n("QbLZ")),o=p(n("iCc5")),i=p(n("V7oC")),u=p(n("FYw3")),a=p(n("mRg0")),s=p(n("cDcd")),f=p(n("17x9")),l=p(n("Wwog")),c=p(n("bB/k")),d=n("Al62");function p(t){return t&&t.__esModule?t:{default:t}}var h=function(t,e){var n=function(t){var e={};return t.forEach(function(t){e[t.id]=t;}),e}(t),r=function(t,e,n){t.forEach(function(n){n.parentId===e?n.__display=!0:n.__display=!1;var r=[];t.filter(function(t){return n.id===t.parentId}).forEach(function(t){return r.push(t.id)}),n.__sub=r,r.length>0?(n.__iconPlus=!0,n.__leaf=!1):(n.__iconPlus=!1,n.__leaf=!0);});var r=[];return t.filter(function(t){return t.id===e}).forEach(function(t){(0, d.dfs)(t,n,function(t){return r.push(t)});}),r}(t,e,n);return function(t,e,n){t.filter(function(t){return t.parentId===e}).map(function(t){return n[t.id]}).forEach(function(t){return function(t,e){!function t(n,r){n.__level=r;var o=n.__sub;if(!o||0!==o.length)for(var i=++r,u=0;u<o.length;u++)t(e[o[u]],i);}(t,1);}(t,n)});}(r,e,n),{formatedDatasets:r,datasetsMap:n}},v=function(t){function e(t){(0, o.default)(this,e);var n=(0, u.default)(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.memoizeInit=(0, l.default)(h),n.state={datasets:n.props.datasets},n}return (0, a.default)(e,t),(0, i.default)(e,[{key:"render",value:function(){var t=this.state.datasets,e=this.props,n=e.rootId,o={rootId:n,rowKey:e.rowKey,columns:e.columns,loading:e.loading,total:e.total,header:e.header,style:e.style,className:e.className},i=this.memoizeInit(t,n),u=i.formatedDatasets,a=i.datasetsMap;return s.default.createElement(c.default,(0, r.default)({},o,{datasets:u,datasetsMap:a}))}}],[{key:"getDerivedStateFromProps",value:function(t,e){return t.datasets&&t.datasets!==e.datasets?{datasets:t.datasets}:null}}]),e}(s.default.Component);v.propTypes={columns:f.default.arrayOf(f.default.shape({title:f.default.string.isRequired,name:f.default.string.isRequired,textAlign:f.default.oneOf(["left","center","right"]),width:f.default.number,bodyRender:f.default.func})).isRequired,datasets:f.default.arrayOf(f.default.object.isRequired),rowKey:f.default.string,rootId:f.default.number.isRequired,loading:f.default.oneOf([f.default.bool,f.default.element]),total:f.default.shape({visible:f.default.bool,name:f.default.string}),header:f.default.shape({fixed:f.default.bool,top:f.default.number}),style:f.default.object,className:f.default.string},v.defaultProps={datasets:[],rowKey:"id",loading:!1,total:{visible:!1,name:"合计数据"},header:{fixed:!1,top:0},style:{},className:""},e.default=v;},dl0q:function(t,e,n){n("Zxgi")("observable");},eUtF:function(t,e,n){t.exports=!n("jmDH")&&!n("KUxP")(function(){return 7!=Object.defineProperty(n("Hsns")("div"),"a",{get:function(){return 7}}).a});},eaoh:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t};},fpC5:function(t,e,n){var r=n("2faE"),o=n("5K7Z"),i=n("w6GO");t.exports=n("jmDH")?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),a=u.length,s=0;a>s;)r.f(t,n=u[s++],e[n]);return t};},hDam:function(t,e){t.exports=function(){};},iCc5:function(t,e,n){e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};},j2DC:function(t,e,n){var r=n("oVml"),o=n("rr1i"),i=n("RfKB"),u={};n("NegM")(u,n("UWiX")("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator");};},jmDH:function(t,e,n){t.exports=!n("KUxP")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a});},kAMH:function(t,e,n){var r=n("a0xu");t.exports=Array.isArray||function(t){return "Array"==r(t)};},kTiW:function(t,e,n){t.exports=n("NegM");},kwZ1:function(t,e,n){var r=n("w6GO"),o=n("mqlF"),i=n("NV0k"),u=n("JB68"),a=n("M1xp"),s=Object.assign;t.exports=!s||n("KUxP")(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t;}),7!=s({},t)[n]||Object.keys(s({},e)).join("")!=r})?function(t,e){for(var n=u(t),s=arguments.length,f=1,l=o.f,c=i.f;s>f;)for(var d,p=a(arguments[f++]),h=l?r(p).concat(l(p)):r(p),v=h.length,y=0;v>y;)c.call(p,d=h[y++])&&(n[d]=p[d]);return n}:s;},lCc8:function(t,e,n){var r=n("Y7ZC");r(r.S,"Object",{create:n("oVml")});},mRg0:function(t,e,n){e.__esModule=!0;var r=u(n("s3Ml")),o=u(n("AyUB")),i=u(n("EJiy"));function u(t){return t&&t.__esModule?t:{default:t}}e.default=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(void 0===e?"undefined":(0, i.default)(e)));t.prototype=(0, o.default)(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(r.default?(0, r.default)(t,e):t.__proto__=e);};},mqlF:function(t,e){e.f=Object.getOwnPropertySymbols;},mzPE:function(t,e,n){(e=t.exports=n("I1BE")(!1)).push([t.i,"\n\n._3aiIsC0HVOiyEp4jvDUUkU {\n  display: flex;\n  flex-wrap: nowrap;\n  background-color: #fff;\n  border-bottom: 1px solid #e5e5e5;\n  padding: 13px 10px 13px;\n}\n\n._2ZpzfqJ7UbvHiBQRGRC0m- {\n  flex: 1 1 75px;\n  line-height: 20px;\n  font-size: 12px;\n  color: #333;\n}\n\n.loZvdkBDxtKbin76nNMSJ {\n  margin-left: 18px;\n  font-weight: 500;\n}\n",""]),e.locals={row:"_3aiIsC0HVOiyEp4jvDUUkU",column_item:"_2ZpzfqJ7UbvHiBQRGRC0m-",columnItem:"_2ZpzfqJ7UbvHiBQRGRC0m-",total:"loZvdkBDxtKbin76nNMSJ"};},o8NH:function(t,e,n){var r=n("Y7ZC");r(r.S+r.F,"Object",{assign:n("kwZ1")});},oVml:function(t,e,n){var r=n("5K7Z"),o=n("fpC5"),i=n("FpHa"),u=n("VVlx")("IE_PROTO"),a=function(){},s=function(){var t,e=n("Hsns")("iframe"),r=i.length;for(e.style.display="none",n("MvwC").appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),s=t.F;r--;)delete s.prototype[i[r]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(a.prototype=r(t),n=new a,a.prototype=null,n[u]=t):n=s(),void 0===e?n:o(n,e)};},rr1i:function(t,e){t.exports=function(t,e){return {enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}};},s3Ml:function(t,e,n){t.exports={default:n("JbBM"),__esModule:!0};},tEej:function(t,e,n){var r=n("Ojgd"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0};},tjUo:function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=function(t){return t&&t.__esModule?t:{default:t}}(n("dWTY"));e.default=r.default;},uOPS:function(t,e){t.exports=!0;},vwuL:function(t,e,n){var r=n("NV0k"),o=n("rr1i"),i=n("NsO/"),u=n("G8Mo"),a=n("B+OT"),s=n("eUtF"),f=Object.getOwnPropertyDescriptor;e.f=n("jmDH")?f:function(t,e){if(t=i(t),e=u(e,!0),s)try{return f(t,e)}catch(t){}if(a(t,e))return o(!r.f.call(t,e),t[e])};},"w2d+":function(t,e,n){var r=n("hDam"),o=n("UO39"),i=n("SBuE"),u=n("NsO/");t.exports=n("MPFp")(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e;},function(){var t=this._t,e=this._k,n=this._i++;return !t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries");},w6GO:function(t,e,n){var r=n("5vMV"),o=n("FpHa");t.exports=Object.keys||function(t){return r(t,o)};},wgeU:function(t,e){},zLkG:function(t,e,n){e.f=n("UWiX");}})});
});

var TableTree = unwrapExports(index_min);

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
      return React__default.createElement("div", null, treeNodes.length ? React__default.createElement(TableTree, {
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
}(React.Component);

exports.getCoverage = getCoverage;
exports.CoverageSummary = Summary;
exports.CoverageDetail = CoverageDetail;
