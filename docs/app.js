webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const DebtFlow = __webpack_require__(22);

/* harmony default export */ __webpack_exports__["a"] = ({

    data() {
        return {

            people: ["Alice", "Bob", "Charles", "Dana"],
            expenses: [

            /*
            {who:"Alice",amount:20,concept:"Food", to:['Alice','Bob']},
            {who:"Alice",amount:12,concept:"Desert"},
            {who:"Charles",amount:10},
            {who:"Charles",amount:13, concept:"Tortilla"},
            {who:"Dana",amount:15, to:["Dana",'Bob','Charles'],concept:"Beer"},
            {who:"Bob", amount:5, to:["Dana"] },
            */

            { who: "Alice", amount: 20, to: ['Bob'] }, { who: "Bob", amount: 20, to: ['Charles'] }, { who: "Charles", amount: 20, to: ['Dana'] }],
            only_known: true,
            debtflow: null

        };
    },

    watch: {

        people() {

            this.expenses = _.filter(this.expenses, exp => {

                if (!_.includes(this.people, exp.who)) return false;

                if (exp.to) {
                    for (let i = 0; i < exp.to.length; i++) {
                        if (!_.includes(this.people, exp.to[i])) return false;
                    }
                }

                return true;
            });
        },

        expenses() {
            this.debtflow = null;
        },

        only_known() {
            this.debtflow = null;
        }

    },

    methods: {

        reset() {
            this.people = [];
        },

        test1() {

            this.people = ["Alice", "Bob", "Charles", "Dana"], this.expenses = [{ who: "Alice", amount: 20, concept: "Food", to: ['Alice', 'Bob'] }, { who: "Alice", amount: 12, concept: "Desert" }, { who: "Charles", amount: 10 }, { who: "Charles", amount: 13, concept: "Tortilla" }, { who: "Dana", amount: 15, to: ["Dana", 'Bob', 'Charles'], concept: "Beer" }, { who: "Bob", amount: 5, to: ["Dana"] }];
        },

        test2() {

            this.people = ["Alice", "Bob", "Charles", "Dana"], this.expenses = [{ who: "Alice", amount: 20, to: ['Bob'] }, { who: "Bob", amount: 20, to: ['Charles'] }, { who: "Charles", amount: 20, to: ['Dana'] }];
        },

        calculate() {

            //
            // Debtflow
            //
            const df = new DebtFlow();

            this.people.map(p => {
                df.addPeople(p);
            });

            this.expenses.map(e => {
                df.addExpense(e.who, e.amount, e.concept, e.to);
            });

            this.debtflow = df;

            //
            // Show
            //

            this.$nextTick(() => {

                let $div = $(this.$refs.inforesults);

                $div.hide();
                $div.slideDown("slow");

                $('html, body').animate({
                    scrollTop: $div.offset().top
                }, 1000);
            });
        } }

});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({

    props: ['value'],

    data() {
        return {
            new_person: '',
            showModal: false
        };
    },

    methods: {

        rm_person(i) {
            this.value.splice(i, 1);
            this.$emit('input', this.value);
        },

        open_modal() {
            this.showModal = true;
        },

        add_person(person) {
            this.showModal = false;
            this.value.push(person.name);
            this.$emit('input', this.value);
        }

    }

});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({

    props: ['value', 'people'],

    data() {
        return {
            new_expense: {
                who: this.people[0],
                amount: 0,
                concept: '',
                to: [],
                to_select: 'all',
                to_list: []
            },
            showModal: false
        };
    },

    mounted() {},

    methods: {

        rm_expense(i) {
            this.value.splice(i, 1);
            this.$emit('input', this.value);
        },

        add_expense(expense) {

            this.showModal = false;

            this.value.push(expense);
            this.$emit('input', this.value);
        },

        open_modal() {
            if (!this.people.length) return;
            this.showModal = true;
        }

    } // methods

});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({

    props: ['debtflow'],

    data() {
        return {
            info: []
        };
    },

    mounted() {
        this.update();
    },

    watch: {
        debtflow() {
            this.update();
        }
    },

    methods: {
        update() {
            this.info = this.debtflow ? this.debtflow.info() : [];
        }
    }

});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({

    props: ['debtflow', 'only_known'],

    data() {
        return {
            flow: [],
            stats: null
        };
    },

    mounted() {
        this.update();
    },

    watch: {
        debtflow() {
            this.update();
        }
    },

    methods: {
        update() {
            this.flow = [];
            this.stats = null;

            if (this.debtflow) {
                let res = this.debtflow.flow(this.only_known);
                this.flow = res.flow;
                this.stats = res.stats;
            }
        }
    }

});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({

    props: {
        closable: {
            default: true
        }
    },

    data() {
        return {};
    },

    methods: {}

});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({

    props: ['people'],

    data() {
        return {
            name: '',
            error: ""
        };
    },

    watch: {
        name() {
            this.error = null;
        }
    },

    methods: {

        onSubmit() {

            let name = this.name.trim();

            if (!name) {
                this.error = "Name is required";
                return;
            };

            for (let i = 0; i < this.people.length; i++) {
                if (this.people[i].toLowerCase() === name.toLowerCase()) {
                    this.error = "Name '" + name + "' is already used";
                    return;
                }
            }

            this.$emit('new_person', {
                name: this.name
            });
        }

    }

});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({

    props: ['people'],

    data() {

        return {
            who: this.people[0],
            amount: 0,
            concept: '',
            shared: 'all',
            list: [],
            error_amount: null,
            error_list: null
        };
    },

    mounted() {

        this.update_list();
    },

    watch: {

        who() {
            this.update_list();
        },

        amount() {
            this.error_amount = null;
        },

        shared() {
            this.update_list();
        },

        "list": { handler: function () {
                this.error_list = null;
            }, deep: true }

    },

    methods: {

        update_list() {

            let list = [];
            this.people.map(p => {
                list.push({
                    name: p,
                    is: this.shared === 'all' || this.who === p
                });
            });

            this.list = list;
        },

        onSubmit() {

            if (!this.amount || this.amount <= 0) {
                this.error_amount = 'Invalid amount';
                return;
            }

            let expense = {
                who: this.who,
                amount: +this.amount,
                concept: this.concept,
                to: null
            };

            if (this.shared !== 'all') {
                expense.to = [];
                this.list.map(x => {
                    if (!x.is) return;
                    expense.to.push(x.name);
                });

                if (!expense.to.length) {
                    this.error_list = "List is empty";
                    return;
                }
            }

            this.$emit('new_expense', expense);
        }

    }

});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
__webpack_require__(16);
module.exports = __webpack_require__(49);


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(3);

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = __webpack_require__(4);

var _lodash2 = _interopRequireDefault(_lodash);

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(20);

var _App2 = _interopRequireDefault(_App);

var _PersonList = __webpack_require__(28);

var _PersonList2 = _interopRequireDefault(_PersonList);

var _ExpenseList = __webpack_require__(31);

var _ExpenseList2 = _interopRequireDefault(_ExpenseList);

var _Info = __webpack_require__(34);

var _Info2 = _interopRequireDefault(_Info);

var _Results = __webpack_require__(37);

var _Results2 = _interopRequireDefault(_Results);

var _ModalTemplate = __webpack_require__(40);

var _ModalTemplate2 = _interopRequireDefault(_ModalTemplate);

var _ModalNewPerson = __webpack_require__(43);

var _ModalNewPerson2 = _interopRequireDefault(_ModalNewPerson);

var _ModalNewExpense = __webpack_require__(46);

var _ModalNewExpense2 = _interopRequireDefault(_ModalNewExpense);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery2.default;

window._ = _lodash2.default;

// The components


// Modals


_vue2.default.component('PersonList', _PersonList2.default);
_vue2.default.component('ExpenseList', _ExpenseList2.default);
_vue2.default.component('Info', _Info2.default);
_vue2.default.component('Results', _Results2.default);
_vue2.default.component('ModalTemplate', _ModalTemplate2.default);
_vue2.default.component('ModalNewPerson', _ModalNewPerson2.default);
_vue2.default.component('ModalNewExpense', _ModalNewExpense2.default);

new _vue2.default({
	el: '#vue-app',
	render: function render(h) {
		return h(_App2.default);
	}
});

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(6);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f8cec904_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(27);
function injectStyle (ssrContext) {
  __webpack_require__(21)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f8cec904"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f8cec904_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = __webpack_require__(23);
var util = __webpack_require__(24);

//
// The class the simplifies the debts
//

var DebtFlow = function () {

    //
    // Constructor
    //
    function DebtFlow() {
        _classCallCheck(this, DebtFlow);

        this.people = [];
        this.expenses = [];
        this.debts = [];
        this.spents = [];
    } // constructor

    //
    // Add a new person (Ignore if duplicated)
    //


    _createClass(DebtFlow, [{
        key: "addPeople",
        value: function addPeople(who) {

            for (var i = 0; i < this.people.length; i++) {
                if (this.people[i] === who) return;
            }
            this.people.push(who);
        } // addPeople


        //
        // Add a common expense
        // If to is null to all the group or to an array of users
        //

    }, {
        key: "addExpense",
        value: function addExpense(who, amount, concept) {
            var _this = this;

            var to = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


            this.addPeople(who);
            if (to) {
                to.map(function (who) {
                    return _this.addPeople(who);
                });
            }
            this.expenses.push({ who: who, amount: amount, concept: concept, to: to });
        } // addExpense

        //
        // Add a Debt
        // A debt is only between two persons
        //

    }, {
        key: "addDebt",
        value: function addDebt(who, amount, to) {
            var concept = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


            this.debts.push({ who: who, amount: amount, concept: concept, to: to });
        } // addDebt

        //
        // Add a spent
        // Is what the person has spent on himself 
        //

    }, {
        key: "addSpent",
        value: function addSpent(who, amount) {
            var concept = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


            this.spents.push({ who: who, amount: amount, concept: concept });
        } // addDebt

        //
        // Generate the debts from the expenses
        //

    }, {
        key: "process_debts",
        value: function process_debts() {
            var _this2 = this;

            this.debts = [];
            this.spents = [];

            this.expenses.map(function (e) {

                var to = _this2.people;
                if (e.to) {
                    to = e.to.map(function (x) {
                        return x;
                    }); // To clone
                }

                to.map(function (t) {
                    if (e.who === t) {
                        _this2.addSpent(t, e.amount / to.length, e.concept);
                        return;
                    };
                    _this2.addDebt(t, e.amount / to.length, e.who, e.concept);
                });
            });
        } // process_debts


        //
        // Calculate what had paid each one and what should they pay
        //

    }, {
        key: "info",
        value: function info() {

            this.process_debts();

            var info = void 0;

            function get_idx(name) {
                for (var i = 0; i < info.length; i++) {
                    if (info[i].name === name) return i;
                }
                return undefined;
            }

            info = this.people.map(function (p) {
                return {
                    name: p,
                    expenses: [],
                    total_expenses: 0,
                    debts: [],
                    total_debts: 0,
                    spents: [],
                    total_spents: 0,
                    bote: 0
                };
            });

            // Add the expenses
            this.expenses.map(function (e) {

                var idx = get_idx(e.who);
                info[idx].expenses.push({
                    to: e.to,
                    amount: e.amount,
                    concept: e.concept,
                    himself: e.himself
                });
            });

            // Add the Debts
            this.debts.map(function (d) {

                var idx = get_idx(d.who);
                info[idx].debts.push({
                    to: d.to,
                    amount: d.amount,
                    concept: d.concept
                });
            });

            // Add the Spents
            this.spents.map(function (d) {

                var idx = get_idx(d.who);
                info[idx].spents.push({
                    amount: d.amount,
                    concept: d.concept
                });
            });

            function reduce_amount(pre, cur) {
                return pre + cur.amount;
            }

            // Calculate totals
            this.people.map(function (p, i) {

                info[i].total_expenses = info[i].expenses.reduce(reduce_amount, 0);
                info[i].total_debts = info[i].debts.reduce(reduce_amount, 0);
                info[i].total_spents = info[i].spents.reduce(reduce_amount, 0);

                info[i].bote = info[i].total_expenses - info[i].total_debts - info[i].total_spents;
            });

            //console.log(util.inspect(info, false, null, true));

            return info;
        }

        //
        // The simplify algorithm
        //

    }, {
        key: "flow",
        value: function flow() {
            var _this3 = this;

            var only_known = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


            this.process_debts();

            // Create a new tree
            var tree = new Tree();

            //
            // Add all to all
            //
            if (!only_known) {
                this.people.map(function (a) {
                    _this3.people.map(function (b) {
                        tree.set(a, b, 0);
                        tree.set(b, a, 0);
                    });
                });
            }

            //
            // Build the tree
            //
            this.debts.map(function (d) {
                // Set 1
                var amount = tree.get(d.who, d.to);
                if (!amount) amount = 0;
                amount += d.amount;
                tree.set(d.who, d.to, amount);

                var amount_inv = tree.get(d.to, d.who);
                if (!amount_inv) amount_inv = 0;
                tree.set(d.to, d.who, amount_inv);
            });

            //tree.debug("Tree 0");

            //
            // Simplify between people
            //
            this.people.map(function (a) {
                _this3.people.map(function (b) {

                    var v = tree.get(a, b);
                    var vi = tree.get(b, a);
                    var m = Math.min(v, vi);
                    if (m === 0) return;

                    tree.set(a, b, v - m);
                    tree.set(b, a, vi - m);
                });
            });

            //tree.debug("Tree 1");

            //
            // Simplify with a pivot
            //
            var reduced = true;
            while (reduced) {

                reduced = false;
                this.people.map(function (a) {
                    _this3.people.map(function (b) {
                        _this3.people.map(function (c) {

                            var d_ab = tree.get(a, b);
                            var d_bc = tree.get(b, c);

                            var m = Math.min(d_ab, d_bc);
                            if (m === 0) return;

                            var d_ac = tree.get(a, c);
                            if (d_ac === null) return;

                            reduced = true;

                            tree.set(a, b, d_ab - m);
                            tree.set(b, c, d_bc - m);
                            tree.set(a, c, d_ac + m);
                        });
                    });
                });
            }

            //tree.debug("Tree 2");


            //
            // Build final flow
            //

            var flow = [];

            function get_idx(name) {
                for (var i = 0; i < flow.length; i++) {
                    if (flow[i].name === name) return i;
                }
                return null;
            }

            // Calculate stats
            var stats = {
                num_pays: 0,
                money_moved: 0,
                max_pay: 0,
                min_pay: 0
            };

            tree.map(function (a, b, v) {

                if (v <= 0) return;

                var idx = get_idx(a);
                if (idx === null) {
                    flow.push({ name: a, pays: [] });
                    idx = flow.length - 1;
                }

                stats.num_pays++;
                stats.money_moved += v;
                stats.max_pay = stats.max_pay === 0 ? v : Math.max(stats.max_pay, v);
                stats.min_pay = stats.min_pay === 0 ? v : Math.min(stats.min_pay, v);

                flow[idx].pays.push({ name: b, amount: v });
            });

            var res = { flow: flow, stats: stats };

            //console.log(util.inspect(res, false, null, true));


            return res;
        } // flow

    }]);

    return DebtFlow;
}();

module.exports = DebtFlow;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VValue = function () {
    function VValue() {
        _classCallCheck(this, VValue);

        this.value = null;
    }

    _createClass(VValue, [{
        key: "set",
        value: function set(value) {
            this.value = value;
        }
    }, {
        key: "get",
        value: function get() {
            return this.value;
        }
    }]);

    return VValue;
}();

var Vertice = function () {
    function Vertice(name) {
        _classCallCheck(this, Vertice);

        this.name = name;
        this.value = null;
    }

    _createClass(Vertice, [{
        key: "setValue",
        value: function setValue(value) {
            this.value = value;
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.value;
        }
    }]);

    return Vertice;
}();

var Node = function () {
    function Node(name) {
        _classCallCheck(this, Node);

        this.name = name;
        this.vertices = [];
    }

    _createClass(Node, [{
        key: "addVertice",
        value: function addVertice(name) {

            var v = this.getVertice(name);
            if (v) return v;

            v = new Vertice(name);
            this.vertices.push(v);

            return v;
        }
    }, {
        key: "getVertice",
        value: function getVertice(name) {
            for (var i = 0; i < this.vertices.length; i++) {
                var vertice = this.vertices[i];
                if (vertice.name === name) return vertice;
            }
            return null;
        }
    }]);

    return Node;
}();

var Tree = function () {
    function Tree() {
        _classCallCheck(this, Tree);

        this.nodes = [];
    }

    _createClass(Tree, [{
        key: "addNode",
        value: function addNode(name) {
            var node = this.getNode(name);
            if (node) return node;
            node = new Node(name);
            this.nodes.push(node);
            return node;
        }
    }, {
        key: "getNode",
        value: function getNode(name) {
            for (var i = 0; i < this.nodes.length; i++) {
                var node = this.nodes[i];
                if (node.name === name) return node;
            }
            return null;
        }
    }, {
        key: "set",
        value: function set(a, b, value) {

            var na = this.addNode(a);
            var va = na.addVertice(b);
            var vva = va.getValue();

            var vvv = vva ? vva : new VValue();

            va.setValue(vvv);

            vvv.set(value);
        }
    }, {
        key: "get",
        value: function get(a, b) {
            var na = this.addNode(a);
            var v = na.getVertice(b);
            if (!v) return null;

            var vv = v.getValue();

            return vv.get();
        }
    }, {
        key: "map",
        value: function map(fn) {

            this.nodes.map(function (n) {
                n.vertices.map(function (v) {
                    fn(n.name, v.name, v.value.get(), v.value);
                });
            });
        }
    }, {
        key: "debug",
        value: function debug() {
            var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tree';

            console.log("=== " + title + " ===");
            this.map(function (a, b, v) {
                console.log("--", a, "->", b, ":", v, "$");
            });
        }
    }]);

    return Tree;
}();

module.exports = Tree;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(25);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(26);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('section',{staticClass:"hero is-primary is-bold"},[_c('div',{staticClass:"hero-body"},[_c('div',{staticClass:"container"},[_c('h1',{staticClass:"title"},[_vm._v("Debt Flow")]),_vm._v(" "),_c('h2',{staticClass:"subtitle"},[_vm._v("Tool to calculate shared expenses")]),_vm._v(" "),_c('div',{staticClass:"buttons"},[_c('a',{staticClass:"button is-outlined is-small is-primary is-inverted",attrs:{"title":"Reset the data"},on:{"click":_vm.reset}},[_vm._v("Reset")]),_vm._v(" "),_c('a',{staticClass:"button is-outlined is-small is-primary is-inverted",attrs:{"title":"Load test data set 1"},on:{"click":_vm.test1}},[_vm._v("Test1")]),_vm._v(" "),_c('a',{staticClass:"button is-outlined is-small is-primary is-inverted",attrs:{"title":"Load test data set 2"},on:{"click":_vm.test2}},[_vm._v("Test2")])])])])]),_vm._v(" "),_c('section',{staticClass:"section"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"columns is-desktop is-centered"},[_c('div',{staticClass:"column"},[_c('PersonList',{model:{value:(_vm.people),callback:function ($$v) {_vm.people=$$v},expression:"people"}})],1),_vm._v(" "),_c('div',{staticClass:"column"},[_c('ExpenseList',{attrs:{"people":_vm.people},model:{value:(_vm.expenses),callback:function ($$v) {_vm.expenses=$$v},expression:"expenses"}})],1)])])]),_vm._v(" "),_c('section',{staticClass:"section"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"buttons has-addons is-centered"},[_c('span',{staticClass:"button is-large is-primary",on:{"click":_vm.calculate}},[_vm._v("Calculate")]),_vm._v(" "),_c('div',{staticClass:"field",staticStyle:{"margin-left":"10px"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.only_known),expression:"only_known"}],staticClass:"switch",attrs:{"type":"checkbox","id":"onlyknown"},domProps:{"checked":Array.isArray(_vm.only_known)?_vm._i(_vm.only_known,null)>-1:(_vm.only_known)},on:{"change":function($event){var $$a=_vm.only_known,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.only_known=$$a.concat([$$v]))}else{$$i>-1&&(_vm.only_known=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.only_known=$$c}}}}),_vm._v(" "),_c('label',{attrs:{"for":"onlyknown","title":"Limits the money exchanges between people that already have debts"}},[_vm._v("Only between known people")])])])])]),_vm._v(" "),(_vm.debtflow)?_c('div',{ref:"inforesults"},[_c('section',{staticClass:"section"},[_c('div',{staticClass:"container"},[_c('Results',{attrs:{"debtflow":_vm.debtflow,"only_known":_vm.only_known}})],1)]),_vm._v(" "),_c('section',{staticClass:"section"},[_c('div',{staticClass:"container"},[_c('Info',{attrs:{"debtflow":_vm.debtflow}})],1)])]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PersonList_vue__ = __webpack_require__(7);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d3ba96de_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PersonList_vue__ = __webpack_require__(30);
function injectStyle (ssrContext) {
  __webpack_require__(29)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d3ba96de"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PersonList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d3ba96de_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PersonList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h1',{staticClass:"title"},[_vm._v("Person list")]),_vm._v(" "),_c('p',{staticClass:"subtitle"},[_vm._v("List of people")]),_vm._v(" "),_c('div',{staticClass:"level is-mobile"},[_c('div',{staticClass:"level-left"}),_vm._v(" "),_c('div',{staticClass:"level-right"},[_c('p',{staticClass:"level-item"},[_vm._v(" Add a new person ")]),_vm._v(" "),_c('button',{staticClass:"level-item button is-primary",on:{"click":function($event){_vm.open_modal()}}},[_vm._v("Add")])])]),_vm._v(" "),_c('table',{staticClass:"table is-hoverable is-fullwidth"},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.value),function(p,i){return _c('tr',[_c('td',[_vm._v(_vm._s(p))]),_vm._v(" "),_c('td',{staticClass:"has-text-right"},[_c('a',{staticClass:"delete",on:{"click":function($event){$event.preventDefault();_vm.rm_person(i)}}})])])}))]),_vm._v(" "),(_vm.showModal)?_c('ModalNewPerson',{attrs:{"people":_vm.value},on:{"close":function($event){_vm.showModal=false},"new_person":_vm.add_person}}):_vm._e()],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th')])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ExpenseList_vue__ = __webpack_require__(8);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_891bffcc_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ExpenseList_vue__ = __webpack_require__(33);
function injectStyle (ssrContext) {
  __webpack_require__(32)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-891bffcc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ExpenseList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_891bffcc_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ExpenseList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h1',{staticClass:"title"},[_vm._v("Expenses list")]),_vm._v(" "),_c('p',{staticClass:"subtitle"},[_vm._v("List of the expenses done by each person")]),_vm._v(" "),_c('div',{staticClass:"level is-mobile"},[_c('div',{staticClass:"level-left"}),_vm._v(" "),_c('div',{staticClass:"level-right"},[_c('p',{staticClass:"level-item"},[_vm._v(" Add new expense ")]),_vm._v(" "),_c('button',{staticClass:"level-item button is-primary",on:{"click":function($event){_vm.open_modal()}}},[_vm._v("Add")])])]),_vm._v(" "),_c('table',{staticClass:"table is-hoverable is-fullwidth"},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.value),function(e,i){return _c('tr',[_c('td',[_vm._v(_vm._s(e.who))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(e.amount))]),_vm._v(" "),_c('td',[_c('i',[_vm._v(_vm._s(e.concept))])]),_vm._v(" "),_c('td',[(e.to)?[_vm._v("\n                        "+_vm._s(e.to.join())+"\n                    ")]:[_vm._v("\n                        ALL\n                    ")]],2),_vm._v(" "),_c('td',{staticClass:"has-text-right"},[_c('a',{staticClass:"delete",on:{"click":function($event){$event.preventDefault();_vm.rm_expense(i)}}})])])}))]),_vm._v(" "),(_vm.showModal)?_c('ModalNewExpense',{attrs:{"people":_vm.people},on:{"close":function($event){_vm.showModal=false},"new_expense":_vm.add_expense}}):_vm._e()],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("Who")]),_vm._v(" "),_c('th',[_vm._v("Amount")]),_vm._v(" "),_c('th',[_vm._v("Concept")]),_vm._v(" "),_c('th',[_vm._v("To")]),_vm._v(" "),_c('th')])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Info_vue__ = __webpack_require__(9);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4a5c3fd2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Info_vue__ = __webpack_require__(36);
function injectStyle (ssrContext) {
  __webpack_require__(35)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4a5c3fd2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Info_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4a5c3fd2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Info_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h1',{staticClass:"title"},[_vm._v("Info")]),_vm._v(" "),_c('p',{staticClass:"subtitle"},[_vm._v("Information about how much has expend\n          or own each person")]),_vm._v(" "),_c('div',[_c('div',{staticClass:"columns is-multiline is-tablet"},[_vm._l((_vm.info),function(person){return _c('div',{staticClass:"column is-one-third"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-content"},[_c('div',{staticClass:"content"},[_c('p',{staticClass:"title"},[_vm._v("\n                                  "+_vm._s(person.name)+"\n                              ")])])]),_vm._v(" "),_c('footer',{staticClass:"card-footer"},[_c('div',{staticClass:"card-footer-item  is-flex"},[_c('div',{staticClass:"has-text-grey small-title"},[_vm._v("Expenses")]),_vm._v(" "),_c('div',{staticClass:"is-size-5"},[_vm._v(_vm._s(person.total_expenses.toFixed(2)))])]),_vm._v(" "),_c('div',{staticClass:"card-footer-item  is-flex"},[_c('div',{staticClass:"has-text-grey small-title"},[_vm._v("For himself")]),_vm._v(" "),_c('div',{staticClass:"is-size-5"},[_vm._v(_vm._s(person.total_spents.toFixed(2)))])]),_vm._v(" "),_c('div',{staticClass:"card-footer-item  is-flex"},[_c('div',{staticClass:"has-text-grey small-title"},[_vm._v("Debts")]),_vm._v(" "),_c('div',{staticClass:"is-size-5"},[_vm._v(_vm._s(person.total_debts.toFixed(2)))])])]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('div',{staticClass:"card-footer-item"},[_c('div',{staticClass:"has-text-grey small-title"},[(person.bote>0)?[_vm._v("\n                                      Should receive\n                                  ")]:[_vm._v("\n                                      Should pay\n                                  ")]],2),_vm._v(" "),_c('span',{class:{'has-text-danger':person.bote<0,'has-text-success':person.bote>0}},[_c('span',{staticClass:"is-size-4"},[_vm._v(_vm._s(Math.abs((person.bote)).toFixed(2))+" ")])])])])]),_vm._v(" "),_c('div',{staticClass:"after-card"},[(person.debts.length)?[_c('h5',{staticClass:"title is-5"},[_vm._v("Debts")]),_vm._v(" "),_c('ul',_vm._l((person.debts),function(d){return _c('li',[_vm._v("\n                                  to "+_vm._s(d.to)+" "+_vm._s(d.amount.toFixed(2))+"\n                                  \n                                  \n                                  "),(d.concept)?[_vm._v("\n                                      for \n                                      "),_c('span',{staticClass:"tag"},[_vm._v(_vm._s(d.concept))])]:_vm._e()],2)}))]:_vm._e()],2)])}),_vm._v(" "),_c('div',{staticClass:"column"})],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Results_vue__ = __webpack_require__(10);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a2889aec_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Results_vue__ = __webpack_require__(39);
function injectStyle (ssrContext) {
  __webpack_require__(38)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a2889aec"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Results_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a2889aec_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Results_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h1',{staticClass:"title"},[_vm._v("Debt-flow result")]),_vm._v(" "),_c('p',{staticClass:"subtitle"},[_vm._v("They debt network")]),_vm._v(" "),_c('div',{staticClass:"columns is-multiline is-tablet"},_vm._l((_vm.flow),function(person){return _c('div',{staticClass:"column is-one-quarter"},[_c('h5',{staticClass:"title is-3"},[_vm._v(_vm._s(person.name))]),_vm._v(" "),_c('table',{staticClass:"table is-hoverable is-fullwidth"},[_vm._m(0,true),_vm._v(" "),_c('tbody',_vm._l((person.pays),function(p){return _c('tr',[_c('td',[_vm._v(_vm._s(p.name))]),_vm._v(" "),_c('td',{staticClass:"has-text-right"},[_vm._v(_vm._s(p.amount.toFixed(2)))])])}))])])})),_vm._v(" "),(_vm.stats)?_c('p',[_vm._v("To pay off debts it is requeried\n        "),_c('b',[_vm._v(_vm._s(_vm.stats.num_pays)+" exchanges ")]),_vm._v("\n        with a total of \n        "),_c('b',[_vm._v(_vm._s(_vm.stats.money_moved.toFixed(2))+" money ")]),_vm._v("\n         moved.\n    ")]):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("To")]),_vm._v(" "),_c('th',{staticClass:"has-text-right"},[_vm._v("Amount")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ModalTemplate_vue__ = __webpack_require__(11);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1476a855_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ModalTemplate_vue__ = __webpack_require__(42);
function injectStyle (ssrContext) {
  __webpack_require__(41)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1476a855"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ModalTemplate_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1476a855_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ModalTemplate_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal is-active"},[_c('div',{staticClass:"modal-background"}),_vm._v(" "),_c('div',{staticClass:"modal-card"},[_c('header',{staticClass:"modal-card-head"},[_c('p',{staticClass:"modal-card-title"},[_vm._t("title",[_vm._v("default title")])],2),_vm._v(" "),_c('button',{staticClass:"delete",attrs:{"aria-label":"close"},on:{"click":function($event){_vm.$emit('close')}}})]),_vm._v(" "),_c('section',{staticClass:"modal-card-body"},[_vm._t("body",[_vm._v("default body")])],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ModalNewPerson_vue__ = __webpack_require__(12);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3062ca11_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ModalNewPerson_vue__ = __webpack_require__(45);
function injectStyle (ssrContext) {
  __webpack_require__(44)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3062ca11"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ModalNewPerson_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3062ca11_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ModalNewPerson_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ModalTemplate',{on:{"close":function($event){_vm.showModal=_vm.$emit('close')}}},[_c('template',{slot:"title"},[_vm._v(" Add new person ")]),_vm._v(" "),_c('template',{slot:"body"},[_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.onSubmit($event)}}},[_c('div',{staticClass:"field"},[_c('label',{staticClass:"label"},[_vm._v("Name")]),_vm._v(" "),_c('div',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.name),expression:"name"}],class:{'is-danger': _vm.error,input:true},attrs:{"type":"text","placeholder":"Name"},domProps:{"value":(_vm.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.name=$event.target.value}}}),_vm._v(" "),_c('p',{staticClass:"help is-danger"},[_vm._v(_vm._s(_vm.error))])])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('div',{staticClass:"control"},[_c('button',{staticClass:"button is-primary",attrs:{"type":"submit"}},[_vm._v("Add")])])])])])],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ModalNewExpense_vue__ = __webpack_require__(13);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23e9f123_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ModalNewExpense_vue__ = __webpack_require__(48);
function injectStyle (ssrContext) {
  __webpack_require__(47)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-23e9f123"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ModalNewExpense_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23e9f123_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ModalNewExpense_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ModalTemplate',{on:{"close":function($event){_vm.showModal=_vm.$emit('close')}}},[_c('template',{slot:"title"},[_vm._v(" Add new expense ")]),_vm._v(" "),_c('template',{slot:"body"},[_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.onSubmit($event)}}},[_c('div',{staticClass:"field"},[_c('div',{staticClass:"control is-expanded"},[_c('label',{staticClass:"label"},[_vm._v("Who")]),_vm._v(" "),_c('div',{staticClass:"select is-fullwidth"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.who),expression:"who"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.who=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.people),function(p,i){return _c('option',{domProps:{"value":p}},[_vm._v(_vm._s(p))])}))])])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('label',{staticClass:"label"},[_vm._v("Amount")]),_vm._v(" "),_c('div',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.amount),expression:"amount"}],class:{'is-danger': _vm.error_amount, input:true},attrs:{"type":"number","step":"0.01","placeholder":"Amount"},domProps:{"value":(_vm.amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.amount=$event.target.value}}}),_vm._v(" "),_c('p',{staticClass:"help is-danger"},[_vm._v(_vm._s(_vm.error_amount))])])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('label',{staticClass:"label"},[_vm._v("Concept")]),_vm._v(" "),_c('div',{staticClass:"control"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.concept),expression:"concept"}],staticClass:"input",attrs:{"type":"text","placeholder":"Concept"},domProps:{"value":(_vm.concept)},on:{"input":function($event){if($event.target.composing){ return; }_vm.concept=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('div',{staticClass:"control is-expanded"},[_c('label',{staticClass:"label"},[_vm._v("Shared")]),_vm._v(" "),_c('div',{staticClass:"select is-fullwidth"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.shared),expression:"shared"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.shared=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{attrs:{"value":"all"}},[_vm._v("Shared among all")]),_vm._v(" "),_c('option',{attrs:{"value":"group"}},[_vm._v("Shared with a subgroup")])])])])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('ul',_vm._l((_vm.list),function(p){return _c('li',[_c('label',{staticClass:"checkbox",attrs:{"disabled":_vm.shared==='all'}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(p.is),expression:"p.is"}],attrs:{"type":"checkbox","disabled":_vm.shared==='all'},domProps:{"checked":Array.isArray(p.is)?_vm._i(p.is,null)>-1:(p.is)},on:{"change":function($event){var $$a=p.is,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(p, "is", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(p, "is", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(p, "is", $$c)}}}}),_vm._v("        \n                            "+_vm._s(p.name)+"\n                        ")])])})),_vm._v(" "),_c('p',{staticClass:"help is-danger"},[_vm._v(_vm._s(_vm.error_list))])]),_vm._v(" "),_c('div',{staticClass:"field"},[_c('div',{staticClass:"control"},[_c('button',{staticClass:"button is-primary",attrs:{"type":"submit"}},[_vm._v("Add")])])])])])],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ })
],[14]);