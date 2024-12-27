'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

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


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const useFormValidator = (initialValues, validationRules) => {
    const [values, setValues] = react.useState(initialValues);
    const [errors, setErrors] = react.useState({});
    const [isSubmitting, setIsSubmitting] = react.useState(false);
    const validateField = (field, value) => __awaiter(void 0, void 0, void 0, function* () {
        const rule = validationRules[field];
        if (!rule)
            return null;
        if (rule.required && !value.trim())
            return `${field} is required`;
        if (rule.pattern && !rule.pattern.test(value))
            return `${field} is invalid`;
        if (rule.minLength && value.length < rule.minLength)
            return `${field} must be at least ${rule.minLength} characters`;
        if (rule.maxLength && value.length > rule.maxLength)
            return `${field} must be no more than ${rule.maxLength} characters`;
        if (rule.custom) {
            const customRules = Array.isArray(rule.custom) ? rule.custom : [rule.custom];
            for (const customRule of customRules) {
                const error = customRule(value, values);
                if (error)
                    return error;
            }
        }
        if (rule.async) {
            const asyncError = yield rule.async(value, values);
            if (asyncError)
                return asyncError;
        }
        return null;
    });
    const validate = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (fieldValues = values) {
        const tempErrors = {};
        for (const field in validationRules) {
            const error = yield validateField(field, fieldValues[field]);
            if (error)
                tempErrors[field] = error;
        }
        setErrors(tempErrors);
        return tempErrors;
    });
    const handleChange = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, value } = e.target;
        setValues(Object.assign(Object.assign({}, values), { [name]: value }));
        const error = yield validateField(name, value);
        setErrors((prevErrors) => (Object.assign(Object.assign({}, prevErrors), { [name]: error || '' })));
    });
    const handleSubmit = (callback) => (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const validationErrors = yield validate();
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            callback();
        }
    });
    return { values, errors, handleChange, handleSubmit, isSubmitting };
};

exports.default = useFormValidator;
exports.useFormValidator = useFormValidator;
