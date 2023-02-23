/*
 * @Author: sanlu.liu@wzip.com
 * @Date: 2023-02-23 11:40:47
 * @LastEditors: sanlu.liu@wzip.com
 * @LastEditTime: 2023-02-23 11:45:59
 * @FilePath: \registry\git-cz-qzd\lib\questions\scope.js
 * @Description: 
 */
const fuzzy = require('fuzzy');

/**
 * Searches for the scopes containing the given substring.
 *
 * @param {string} substring Substring to search with.
 * @param {string[]} scopes Scopes list.
 */
const findScope = function (substring, scopes) {
  return Promise.resolve(fuzzy.filter(substring || '', scopes).map(({original: scope}) => scope));
};

exports.createQuestion = (state) => {
  const {scopes,inputScope} = state.config;
  
  if(inputScope && Object.prototype.toString.call(inputScope)==="[object Object]"){

    const {minLength,maxLength} = inputScope;
    const minScopeLengthErrorMessage = `The scope must have at least ${minLength} characters`;
    const question = {
      filter: (input) => {
        let scope;
  
        scope = input.trim();
        while (scope.endsWith('.')) {
          scope = scope.substr(0, subject.length - 1).trim();
        }
  
        return scope;
      },
      
  
      // Minus 3 chars are for emoji + space.
      maxLength,
      message: 'Write a short, imperative mood scope description of the change:',
      name: 'scope',
      type: 'limitedInput',
      validate: (input) => input.length >= minLength || minScopeLengthErrorMessage
    };
  
    return question;


  }

  if (!scopes) {
    return null;
  }

  if (!Array.isArray(scopes)) {
    throw new TypeError('scopes must be an array of strings.');
  }

  if (scopes.length < 1) {
    return null;
  }

  const question = {
    message: 'Select the scope this component affects:',
    name: 'scope',
    source: (_answers, input) => findScope(input, scopes),
    type: 'autocomplete'
  };

  return question;
};
