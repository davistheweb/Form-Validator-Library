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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|2131|1800|35\d{3}[0-9]{11}|4[0-9]{15})$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const postalCodeRegex = /^[0-9]{5}(-[0-9]{4})?$/;
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
console.log('Robinson Honour is Cooking :)');
console.log("1.0.4");
const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8)
        strength += 25;
    if (password.match(/[a-z]+/))
        strength += 10;
    if (password.match(/[A-Z]+/))
        strength += 15;
    if (password.match(/[0-9]+/))
        strength += 25;
    if (password.match(/[$@#&!]+/))
        strength += 25;
    return Math.min(strength, 100);
};
const useFormValidator = (initialValues, validationRules) => {
    const [values, setValues] = react.useState(initialValues);
    const [errors, setErrors] = react.useState({});
    const [passwordStrength, setPasswordStrength] = react.useState(0);
    const [isSubmitting, setIsSubmitting] = react.useState(false);
    const validateField = (field, value) => __awaiter(void 0, void 0, void 0, function* () {
        const rule = validationRules[field];
        if (!rule)
            return null;
        if (rule.required && !value.trim())
            return `${field} is required`;
        switch (rule.type) {
            case 'email':
                if (!emailRegex.test(value))
                    return `Please enter a valid email address`;
                break;
            case 'password':
                const strength = calculatePasswordStrength(value);
                setPasswordStrength(strength);
                if (rule.passwordStrength && strength < rule.passwordStrength) {
                    return `Password strength must be at least ${rule.passwordStrength}`;
                }
                break;
            case 'creditCard':
                const cleanedValue = value.replace(/\s/g, '');
                if (!creditCardRegex.test(cleanedValue)) {
                    return 'Please enter a valid credit card number (Visa, MasterCard, American Express, Discover, or Verve - updated)';
                }
                break;
            case 'cvv':
                if (!/^\d{3,4}$/.test(value))
                    return 'CVV must be 3 or 4 digits';
                break;
            case 'phone':
                if (!phoneRegex.test(value))
                    return 'Please enter a valid phone number';
                break;
            case 'date':
                if (!dateRegex.test(value))
                    return 'Please enter a valid date in YYYY-MM-DD format';
                break;
            case 'postalCode':
                if (!postalCodeRegex.test(value))
                    return 'Please enter a valid postal code';
                break;
            case 'url':
                if (!urlRegex.test(value))
                    return 'Please enter a valid URL';
                break;
            case 'numeric':
                if (isNaN(Number(value)))
                    return 'Please enter a valid number';
                break;
        }
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
    return { values, errors, handleChange, handleSubmit, isSubmitting, passwordStrength };
};

exports.default = useFormValidator;
exports.useFormValidator = useFormValidator;
