import { jest } from '@jest/globals';

import {
  getElement,
  getElements,
  addEventListenerWithErrorHandling,
} from './utils.js';

describe('DOMUtils', () => {
  document.body.innerHTML = `
    <div id="test-element"></div>
    <div class="test-elements"></div>
    <div class="test-elements"></div>
  `;

  test('getElement should return the element for a valid selector', () => {
    expect(getElement('#test-element')).toBeTruthy();
  });

  test('getElement should throw an error for an invalid selector', () => {
    expect(() => getElement('#invalid-element')).toThrow(
      'Element with selector "#invalid-element" not found'
    );
  });

  test('getElements should return the elements for a valid selector', () => {
    expect(getElements('.test-elements')).toHaveLength(2);
  });

  test('getElements should throw an error for an invalid selector', () => {
    expect(() => getElements('.invalid-elements')).toThrow(
      'No elements found with selector ".invalid-elements"'
    );
  });

  test('addEventListenerWithErrorHandling should add an event listener to the element', () => {
    const element = getElement('#test-element');
    const handler = jest.fn();
    addEventListenerWithErrorHandling(element, 'click', handler);
    element.click();
    expect(handler).toHaveBeenCalled();
  });

  test('addEventListenerWithErrorHandling should throw an error if the element is undefined', () => {
    expect(() =>
      addEventListenerWithErrorHandling(undefined, 'click', () => {})
    ).toThrow('Cannot add event listener to undefined element');
  });
});
