'use strict';

import {
  getElement,
  getElements,
  addEventListenerWithErrorHandling,
} from './utils.js';

const accordion = getElement('.accordion');
const accordionHeaders = getElements('.accordion-item-header');
const accordionItems = getElements('.accordion-item');

const plusIcon = new URL('../assets/images/icon-plus.svg', import.meta.url)
  .href;
const minusIcon = new URL('../assets/images/icon-minus.svg', import.meta.url)
  .href;

const isTest = process.env.NODE_ENV === 'test';

function scheduleUpdate(callback) {
  if (isTest) {
    callback();
  } else {
    requestAnimationFrame(callback);
  }
}

function handleKeydown(e, headers) {
  const { key } = e;
  const header = e.target;
  const currentIndex = headers.indexOf(header);

  if (key === 'ArrowDown' || key === 'ArrowUp') {
    e.preventDefault();
    const nextIndex =
      key === 'ArrowDown'
        ? (currentIndex + 1) % headers.length
        : (currentIndex - 1 + headers.length) % headers.length;
    headers[nextIndex].focus();
  } else if (key === 'Home') {
    e.preventDefault();
    headers[0].focus();
  } else if (key === 'End') {
    e.preventDefault();
    headers[headers.length - 1].focus();
  } else if (key === 'Enter' || key === ' ') {
    e.preventDefault();
    toggleAccordion(header.closest('.accordion-item'));
  }
}

function toggleAccordion(item) {
  const isExpanding = !item.classList.contains('active');
  const toggleBtn = item.querySelector('.accordion-item-toggle-btn');
  const content = item.querySelector('.accordion-content');
  const icon = toggleBtn.querySelector('.accordion-toggle-icon');

  accordionItems.forEach((activeItem) => {
    if (activeItem !== item && activeItem.classList.contains('active')) {
      const activeToggleBtn = activeItem.querySelector(
        '.accordion-item-toggle-btn'
      );
      activeItem.classList.remove('active');
      activeToggleBtn.setAttribute('aria-expanded', 'false');
      activeItem
        .querySelector('.accordion-content')
        .setAttribute('aria-hidden', 'true');
      activeItem
        .querySelector('.accordion-toggle-icon')
        .setAttribute('src', plusIcon);
    }
  });

  scheduleUpdate(() => {
    item.classList.toggle('active', isExpanding);
    toggleBtn.setAttribute('aria-expanded', isExpanding);
    content.setAttribute('aria-hidden', !isExpanding);
    icon.setAttribute('src', isExpanding ? minusIcon : plusIcon);
  });
}

try {
  const controller = new AbortController();
  const { signal } = controller;

  addEventListenerWithErrorHandling(
    accordion,
    'click',
    (e) => {
      const header = e.target.closest('.accordion-item-header');
      if (header) {
        toggleAccordion(header.closest('.accordion-item'));
      }
    },
    { signal }
  );

  addEventListenerWithErrorHandling(
    accordion,
    'keydown',
    (e) => {
      const header = e.target.closest('.accordion-item-header');
      if (header) {
        handleKeydown(e, accordionHeaders);
      }
    },
    { signal }
  );

  window.addEventListener(
    'beforeunload',
    () => {
      controller.abort();
    },
    { signal }
  );
} catch (error) {
  console.error('Failed to initialize accordion:', error);
}
