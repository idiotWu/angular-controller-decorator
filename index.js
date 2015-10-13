'use strict';

module.exports = function decorator(SuperClass) {
    function SubClass() {
        var _this = this;
        var deps = arguments;

        Object.defineProperty(_this, 'injections', {
            value: {},
            writable: true,
            enumerable: false,
            configurable: false
        });

        if (SuperClass.$inject) {
            SuperClass.$inject.forEach(function(depName, idx) {
                _this.injections[depName] = deps[idx];
            });
        }

        SuperClass.apply(_this, deps);
    };

    SubClass.$inject = SuperClass.$inject;
    SubClass.prototype = Object.create(SuperClass.prototype);

    return SubClass;
};
