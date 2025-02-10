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
                  <button class="accordion-item-header" id="item1-header" aria-expanded="false" aria-controls="item1-content">
                    <h2>What is Frontend Mentor?</h2>
                    <img src="./public/assets/images/icon-plus.svg" class="accordion-toggle-icon" aria-hidden="true" alt="">
                  </button>
                  <p class="accordion-content" id="item1-content" aria-labelledby="item1-header" aria-hidden="true">Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript.</p>
                </div>
                <div class="accordion-item">
                  <button class="accordion-item-header" id="item2-header" aria-expanded="false" aria-controls="item2-content">
                    <h2>Is Frontend Mentor free?</h2>
                    <img src="./public/assets/images/icon-plus.svg" class="accordion-toggle-icon" aria-hidden="true" alt="">
                  </button>
                  <p class="accordion-content" id="item2-content" aria-labelledby="item2-header" aria-hidden="true">Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.</p>
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

  test('clicking accordion header should toggle content visibility', () => {
    const header = document.querySelector('.accordion-item-header');
    const content = document.querySelector('.accordion-content');

    fireEvent.click(header);
    expect(content.getAttribute('aria-hidden')).toBe('false');
    expect(header.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(header);
    expect(content.getAttribute('aria-hidden')).toBe('true');
    expect(header.getAttribute('aria-expanded')).toBe('false');
  });

  test('icon should change when toggling accordion', () => {
    const header = document.querySelector('.accordion-item-header');
    const icon = header.querySelector('.accordion-toggle-icon');
    const originalSrc = icon.src;

    fireEvent.click(header);
    expect(icon.src).not.toBe(originalSrc);
    expect(icon.src).toContain('icon-minus.svg');

    fireEvent.click(header);
    expect(icon.src).toBe(originalSrc);
  });

  test('only one accordion item should be open at a time', () => {
    const headers = document.querySelectorAll('.accordion-item-header');
    const contents = document.querySelectorAll('.accordion-content');

    fireEvent.click(headers[0]);
    expect(contents[0].getAttribute('aria-hidden')).toBe('false');
    expect(headers[0].getAttribute('aria-expanded')).toBe('true');
    expect(contents[1].getAttribute('aria-hidden')).toBe('true');

    fireEvent.click(headers[1]);
    expect(contents[0].getAttribute('aria-hidden')).toBe('true');
    expect(headers[0].getAttribute('aria-expanded')).toBe('false');
    expect(contents[1].getAttribute('aria-hidden')).toBe('false');
    expect(headers[1].getAttribute('aria-expanded')).toBe('true');
  });

  test('keyboard navigation should work with Enter and Space', () => {
    const header = document.querySelector('.accordion-item-header');
    const content = document.querySelector('.accordion-content');

    fireEvent.keyDown(header, { key: 'Enter' });
    expect(content.getAttribute('aria-hidden')).toBe('false');
    expect(header.getAttribute('aria-expanded')).toBe('true');

    fireEvent.keyDown(header, { key: 'Enter' });
    expect(content.getAttribute('aria-hidden')).toBe('true');
    expect(header.getAttribute('aria-expanded')).toBe('false');

    fireEvent.keyDown(header, { key: ' ' });
    expect(content.getAttribute('aria-hidden')).toBe('false');
    expect(header.getAttribute('aria-expanded')).toBe('true');

    fireEvent.keyDown(header, { key: ' ' });
    expect(content.getAttribute('aria-hidden')).toBe('true');
    expect(header.getAttribute('aria-expanded')).toBe('false');
  });
});
