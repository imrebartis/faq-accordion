import '../styles/style.css';
import {
  getElement,
  getElements,
  addEventListenerWithErrorHandling,
} from './utils';

try {
  const accordion = getElement('.accordion');
  const accordionHeaders = getElements('.accordion-item-header');

  const handleAccordionClick = (e) => {
    const activeItem = e.target.closest('.accordion-item');
    if (!activeItem) return;
    toggleAccordion(activeItem);
  };

  addEventListenerWithErrorHandling(accordion, 'click', handleAccordionClick);

  const headerKeydownHandlers = new Map();

  accordionHeaders.forEach((header) => {
    header.setAttribute('aria-expanded', 'false');

    const handleKeydown = (e) => {
      const targetHeader = e.target;
      const firstHeader = accordionHeaders[0];
      const lastHeader = accordionHeaders[accordionHeaders.length - 1];
      let nextHeader;
      let prevHeader;
      let item;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          nextHeader =
            accordionHeaders[accordionHeaders.indexOf(targetHeader) + 1] ||
            firstHeader;
          nextHeader.focus();
          break;

        case 'ArrowUp':
          e.preventDefault();
          prevHeader =
            accordionHeaders[accordionHeaders.indexOf(targetHeader) - 1] ||
            lastHeader;
          prevHeader.focus();
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          item = targetHeader.closest('.accordion-item');
          toggleAccordion(item);
          break;
      }
    };

    headerKeydownHandlers.set(header, handleKeydown);
    header.addEventListener('keydown', handleKeydown);
  });

  function toggleAccordion(itemToActivate) {
    const header = itemToActivate.querySelector('.accordion-item-header');
    const content = itemToActivate.querySelector('.accordion-content');
    const img = header.querySelector('.accordion-toggle-icon');
    const isExpanding = !itemToActivate.classList.contains('active');

    accordionHeaders.forEach((otherHeader) => {
      const otherItem = otherHeader.closest('.accordion-item');
      otherItem.classList.remove('active');
      otherHeader.setAttribute('aria-expanded', false);
      otherItem
        .querySelector('.accordion-content')
        .setAttribute('aria-hidden', true);
      otherItem.querySelector('.accordion-toggle-icon').src =
        './public/assets/images/icon-plus.svg';
    });

    if (isExpanding) {
      itemToActivate.classList.add('active');
      header.setAttribute('aria-expanded', true);
      content.setAttribute('aria-hidden', false);
      img.src = './public/assets/images/icon-minus.svg';
    }
  }

  const cleanup = () => {
    accordion.removeEventListener('click', handleAccordionClick);
    accordionHeaders.forEach((header) => {
      const keydownHandler = headerKeydownHandlers.get(header);
      if (keydownHandler) {
        header.removeEventListener('keydown', keydownHandler);
      }
    });
    headerKeydownHandlers.clear();
  };

  window.addEventListener('unload', cleanup);
} catch (error) {
  console.error('Failed to initialize accordion:', error);
}
