function Application() {
}

/**
 * JavaScript Debounce Function
 * @param string func Callback
 * @param int ms Time in ms
 * @returns {Function}
 */
Application.prototype.debouncer = function (func, ms) {
  var timeoutID , timeout = ms || 250;
  return function () {
    var scope = this , args = arguments;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      func.apply(scope, Array.prototype.slice.call(args));
    }, timeout);
  };
};

Application.prototype.init = function () {

};

$(document).ready(function () {



});