'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            running: false,
            bg: false,
            times: {
                miliseconds: 0,
                seconds: 0,
                minutes: 0
            }
        };
        _this.start = _this.start.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.step = _this.step.bind(_this);
        _this.print = _this.print.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'reset',
        value: function reset() {
            this.setState({
                running: false,
                times: {
                    miliseconds: 0,
                    seconds: 0,
                    minutes: 0
                }
            });
            clearInterval(this.watch);
            this.print();
        }
    }, {
        key: 'print',
        value: function print() {
            return this.format(this.state.times);
        }
    }, {
        key: 'format',
        value: function format(props) {
            var timer = this.pad0(this.state.times.minutes) + ':' + this.pad0(this.state.times.seconds) + ':' + this.pad0(this.state.times.miliseconds);
            return timer;
        }
    }, {
        key: 'pad0',
        value: function pad0(val) {
            var result = val.toString();
            if (result.length < 2) {
                result = '0' + result;
            }

            return result;
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            var bg = false;
            if (this.state.running == false) {
                this.setState({
                    running: true
                });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
                if (this.state.bg === false) {
                    setInterval(functionDraw, 50);
                    this.setState({
                        bg: true
                    });
                }
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (this.state.running == false) return;
            var miliseconds = this.state.times.miliseconds;
            var seconds = this.state.times.seconds;
            var minutes = this.state.times.minutes;

            miliseconds++;
            if (miliseconds >= 100) {
                seconds += 1;
                miliseconds = 0;
            }
            if (seconds >= 60) {
                minutes += 1;
                seconds = 0;
            }
            this.setState({
                times: {
                    miliseconds: miliseconds,
                    seconds: seconds,
                    minutes: minutes
                }
            });
            this.print();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#',
                            className: 'button',
                            onClick: this.start },
                        'Start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#',
                            className: 'button',
                            onClick: this.stop },
                        'Stop'
                    ),
                    React.createElement(
                        'a',
                        { href: '#',
                            className: 'button',
                            onClick: this.reset },
                        'Reset'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    this.print()
                ),
                React.createElement('ul', { className: 'results' })
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
