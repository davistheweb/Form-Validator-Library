import { useState } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var useFormValidator = function (initialValues, validationRules) {
    var _a = useState(initialValues), values = _a[0], setValues = _a[1];
    var _b = useState({}), errors = _b[0], setErrors = _b[1];
    var _c = useState(false), isSubmitting = _c[0], setIsSubmitting = _c[1];
    var validateField = function (field, value) { return __awaiter(void 0, void 0, void 0, function () {
        var rule, customRules, _i, customRules_1, customRule, error, asyncError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rule = validationRules[field];
                    if (!rule)
                        return [2 /*return*/, null];
                    if (rule.required && !value.trim())
                        return [2 /*return*/, "".concat(field, " is required")];
                    if (rule.pattern && !rule.pattern.test(value))
                        return [2 /*return*/, "".concat(field, " is invalid")];
                    if (rule.minLength && value.length < rule.minLength)
                        return [2 /*return*/, "".concat(field, " must be at least ").concat(rule.minLength, " characters")];
                    if (rule.maxLength && value.length > rule.maxLength)
                        return [2 /*return*/, "".concat(field, " must be no more than ").concat(rule.maxLength, " characters")];
                    if (rule.custom) {
                        customRules = Array.isArray(rule.custom) ? rule.custom : [rule.custom];
                        for (_i = 0, customRules_1 = customRules; _i < customRules_1.length; _i++) {
                            customRule = customRules_1[_i];
                            error = customRule(value, values);
                            if (error)
                                return [2 /*return*/, error];
                        }
                    }
                    if (!rule.async) return [3 /*break*/, 2];
                    return [4 /*yield*/, rule.async(value, values)];
                case 1:
                    asyncError = _a.sent();
                    if (asyncError)
                        return [2 /*return*/, asyncError];
                    _a.label = 2;
                case 2: return [2 /*return*/, null];
            }
        });
    }); };
    var validate = function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (fieldValues) {
            var tempErrors, _a, _b, _c, _d, field, error;
            if (fieldValues === void 0) { fieldValues = values; }
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        tempErrors = {};
                        _a = validationRules;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _d = 0;
                        _e.label = 1;
                    case 1:
                        if (!(_d < _b.length)) return [3 /*break*/, 4];
                        _c = _b[_d];
                        if (!(_c in _a)) return [3 /*break*/, 3];
                        field = _c;
                        return [4 /*yield*/, validateField(field, fieldValues[field])];
                    case 2:
                        error = _e.sent();
                        if (error)
                            tempErrors[field] = error;
                        _e.label = 3;
                    case 3:
                        _d++;
                        return [3 /*break*/, 1];
                    case 4:
                        setErrors(tempErrors);
                        return [2 /*return*/, tempErrors];
                }
            });
        });
    };
    var handleChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, value, error;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = e.target, name = _a.name, value = _a.value;
                    setValues(__assign(__assign({}, values), (_b = {}, _b[name] = value, _b)));
                    return [4 /*yield*/, validateField(name, value)];
                case 1:
                    error = _c.sent();
                    setErrors(function (prevErrors) {
                        var _a;
                        return (__assign(__assign({}, prevErrors), (_a = {}, _a[name] = error || '', _a)));
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (callback) { return function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var validationErrors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, validate()];
                case 1:
                    validationErrors = _a.sent();
                    if (Object.keys(validationErrors).length === 0) {
                        setIsSubmitting(true);
                        callback();
                    }
                    return [2 /*return*/];
            }
        });
    }); }; };
    return { values: values, errors: errors, handleChange: handleChange, handleSubmit: handleSubmit, isSubmitting: isSubmitting };
};

export { useFormValidator };
