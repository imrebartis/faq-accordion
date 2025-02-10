'use strict';
export function getElement(selector, parent = document) {
  const element = parent.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found`);
  }
  return element;
}

export function getElements(selector, parent = document) {
  const elements = Array.from(parent.querySelectorAll(selector));
  if (!elements.length) {
    throw new Error(`No elements found with selector "${selector}"`);
  }
  return elements;
}

export function addEventListenerWithErrorHandling(element, event, handler) {
  if (!element) {
    throw new Error('Cannot add event listener to undefined element');
  }
  element.addEventListener(event, handler);
}
