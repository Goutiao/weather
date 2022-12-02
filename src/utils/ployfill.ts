//去除谷歌浏览器的scroll、wheel等事件警告
(function () {
    if (typeof EventTarget !== "undefined") {
      let func = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (type, fn, capture) {
        func = func;
        if (typeof capture !== "boolean") {
          capture = capture || {};
          capture.passive = false;
        }
        func(type, fn, capture);
      };
    }
  }());
