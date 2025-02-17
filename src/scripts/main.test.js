'use strict';

import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

describe('FAQ Accordion', () => {
  const setupDOM = () => {
    document.body.innerHTML = `
      <main>
        <h1>FAQs</h1>
        <article class="accordion-container">
          <div class="accordion">
            <div class="accordion-item">
              <h2 class="accordion-item-header" id="item1-header" tabindex="0">
                <span class="accordion-item-title">What is Frontend Mentor?</span>
                <button class="accordion-item-toggle-btn" aria-expanded="false" aria-controls="item1-content" aria-labelledby="item1-header" tabindex="-1">
                  <img src="src/assets/images/icon-plus.svg" class="accordion-toggle-icon" aria-hidden="true" alt="">
                </button>
              </h2>
              <p class="accordion-content" id="item1-content" aria-labelledby="item1-header" aria-hidden="true">Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript.</p>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-item-header" id="item2-header" tabindex="0">
                <span class="accordion-item-title">Is Frontend Mentor free?</span>
                <button class="accordion-item-toggle-btn" aria-expanded="false" aria-controls="item2-content" aria-labelledby="item2-header" tabindex="-1">
                  <img src="src/assets/images/icon-plus.svg" class="accordion-toggle-icon" aria-hidden="true" alt="">
                </button>
              </h2>
              <p class="accordion-content" id="item2-content" aria-labelledby="item2-header" aria-hidden="true">Yes, Frontend Mentor offers both free and premium coding challenges.</p>
            </div>
          </div>
        </article>
      </main>
    `;
  };

  beforeEach(async () => {
    document.body.innerHTML = '';
    jest.resetModules();
    setupDOM();
    await import('./main.js');
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.resetModules();
  });

  test('clicking accordion item header should toggle content visibility', () => {
    const header = document.querySelector('.accordion-item-header');
    const toggleBtn = document.querySelector('.accordion-item-toggle-btn');
    const content = document.querySelector('.accordion-content');

    fireEvent.click(header);
    expect(content.getAttribute('aria-hidden')).toBe('false');
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(header);
    expect(content.getAttribute('aria-hidden')).toBe('true');
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
  });

  test('icon should change when toggling accordion item', () => {
    const header = document.querySelector('.accordion-item-header');
    const icon = header.querySelector('.accordion-toggle-icon');

    expect(icon.getAttribute('src')).toMatch(/icon-plus\.svg$/);

    fireEvent.click(header);
    expect(icon.getAttribute('src')).toMatch(/icon-minus\.svg$/);

    fireEvent.click(header);
    expect(icon.getAttribute('src')).toMatch(/icon-plus\.svg$/);
  });

  test('only one accordion item should be open at a time', () => {
    const headers = document.querySelectorAll('.accordion-item-header');
    const toggleBtns = document.querySelectorAll('.accordion-item-toggle-btn');
    const contents = document.querySelectorAll('.accordion-content');

    fireEvent.click(headers[0]);
    expect(contents[0].getAttribute('aria-hidden')).toBe('false');
    expect(toggleBtns[0].getAttribute('aria-expanded')).toBe('true');
    expect(contents[1].getAttribute('aria-hidden')).toBe('true');
    expect(toggleBtns[1].getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(headers[1]);
    expect(contents[0].getAttribute('aria-hidden')).toBe('true');
    expect(toggleBtns[0].getAttribute('aria-expanded')).toBe('false');
    expect(contents[1].getAttribute('aria-hidden')).toBe('false');
    expect(toggleBtns[1].getAttribute('aria-expanded')).toBe('true');
  });

  test('keyboard navigation should work with Enter and Space', () => {
    const header = document.querySelector('.accordion-item-header');
    const toggleBtn = document.querySelector('.accordion-item-toggle-btn');
    const content = document.querySelector('.accordion-content');

    fireEvent.keyDown(header, { key: 'Enter' });
    expect(content.getAttribute('aria-hidden')).toBe('false');
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

    fireEvent.keyDown(header, { key: ' ' });
    expect(content.getAttribute('aria-hidden')).toBe('true');
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
  });

  test('keyboard navigation should work with ArrowUp and ArrowDown', () => {
    const headers = document.querySelectorAll('.accordion-item-header');

    headers[0].focus();
    fireEvent.keyDown(headers[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(headers[1]);

    fireEvent.keyDown(headers[1], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(headers[0]);
  });

  test('keyboard navigation should work with Home and End', () => {
    const headers = document.querySelectorAll('.accordion-item-header');

    headers[0].focus();
    fireEvent.keyDown(headers[0], { key: 'End' });
    expect(document.activeElement).toBe(headers[1]);

    fireEvent.keyDown(headers[1], { key: 'Home' });
    expect(document.activeElement).toBe(headers[0]);
  });
});
