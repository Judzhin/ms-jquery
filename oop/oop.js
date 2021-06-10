/**
 *
 * @type {{DEFAULTS, ready, _init}}
 */
var APP = (function ($) {

    /**
     *
     * @type {{}}
     */
    var defaultOptions = {};

    /**
     *
     * @param options
     * @constructor
     */
    var A = function (options) {
        this.$options = $.extend({}, this.DEFAULTS, options);
        console.log('Class A, Constructor');
    };

    A.prototype = {
        DEFAULTS: {
            propertyA: 'A',
            propertyB: 'B'
        },

        methodA: function () {
            console.log('Class A, Method A');
        },

        methodB: function () {
            console.log('Class A, Method B');
        },

        methodOptions: function () {
            console.log(this.$options);
        }
    };

    /**
     *
     * @param options
     * @constructor
     */
    var B = function (options) {
        this.$options = $.extend({}, this.DEFAULTS, options);
        console.log('Class B, Constructor');
    };

    B.prototype = Object.create(A.prototype, {
        DEFAULTS: {
            propertyC: 'C'
        },
        methodC: {
            value: function () {
                console.log('Class B, Method C');
            }
        }
    });

    /**
     *
     * @param options
     * @constructor
     */
    var C = function (options) {
        this.$options = $.extend({}, this.DEFAULTS, options);
        console.log('Class C, Constructor');
    };

    C.prototype = Object.create(B.prototype, {
        DEFAULTS: {
            propertyC: 'C'
        },
        methodC: {
            value: function () {
                console.log('Class C, Method C');
                B.prototype.methodC.call(this, arguments);
            }
        }
    });

    return {
        DEFAULTS: {
            // Default Properties
        },

        /**
         *
         * @param options
         */
        ready: function (options) {

            var self = this, $initializer = $.Deferred(function (deffered) {
                $(function () {
                    deffered.resolve.call(self, deffered.$options);
                });
            });

            this.$options = $.extend(defaultOptions, this.DEFAULTS, options);

            $.each(this.initialize, function (name) {
                if (name in self.$options) {
                    // self.initialize[name](self.$options[name]);
                    $initializer.$options = self.$options[name];
                    $initializer.then(this, $initializer.$options);
                }
            });
        },

        initialize: {
            /**
             *
             * @param options
             */
            classA: function (options) {
                var a = new A(options);
                a.methodA();
                a.methodB();
                a.methodOptions();
            },

            /**
             *
             * @param options
             */
            classB: function (options) {
                var b = new B(options);
                b.methodA();
                b.methodB();
                b.methodC();
                b.methodOptions();
            },

            /**
             *
             * @param options
             */
            classC: function (options) {
                var c = new C(options);
                c.methodA();
                c.methodB();
                c.methodC();
                c.methodOptions();
            }
        }
    }
}).call(this, jQuery);