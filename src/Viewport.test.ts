import { assert } from 'chai';
import { Viewport } from './Viewport';

describe('Viewport', () => {
  let terminal;
  let viewportElement;
  let charMeasure;
  let viewport;
  let scrollAreaElement;

  const CHARACTER_HEIGHT = 10;

  beforeEach(() => {
    terminal = {
      lines: [],
      rows: 0,
      ydisp: 0,
      on: () => {},
      rowContainer: {
        style: {
          lineHeight: 0
        }
      }
    };
    viewportElement = {
      addEventListener: () => {},
      style: {
        height: 0,
        lineHeight: 0
      }
    };
    scrollAreaElement = {
      style: {
        height: 0
      }
    };
    charMeasure = {
      height: CHARACTER_HEIGHT
    };
    viewport = new Viewport(terminal, viewportElement, scrollAreaElement, charMeasure);
  });

  describe('refresh', () => {
    it('should set the line-height of the terminal', done => {
      // Allow CharMeasure to be initialized
      setTimeout(() => {
        assert.equal(viewportElement.style.lineHeight, CHARACTER_HEIGHT + 'px');
        assert.equal(terminal.rowContainer.style.lineHeight, CHARACTER_HEIGHT + 'px');
        charMeasure.height = 1;
        viewport.refresh();
        assert.equal(viewportElement.style.lineHeight, '1px');
        assert.equal(terminal.rowContainer.style.lineHeight, '1px');
        done();
      }, 0);
    });
    it('should set the height of the viewport when the line-height changed', () => {
      terminal.lines.push('');
      terminal.lines.push('');
      terminal.rows = 1;
      viewport.refresh();
      assert.equal(viewportElement.style.height, 1 * CHARACTER_HEIGHT + 'px');
      charMeasure.height = 20;
      viewport.refresh();
      assert.equal(viewportElement.style.height, 20 + 'px');
    });
  });

  describe('syncScrollArea', () => {
    it('should sync the scroll area', done => {
      // Allow CharMeasure to be initialized
      setTimeout(() => {
        terminal.lines.push('');
        terminal.rows = 1;
        assert.equal(scrollAreaElement.style.height, 0 * CHARACTER_HEIGHT + 'px');
        viewport.syncScrollArea();
        assert.equal(viewportElement.style.height, 1 * CHARACTER_HEIGHT + 'px');
        assert.equal(scrollAreaElement.style.height, 1 * CHARACTER_HEIGHT + 'px');
        terminal.lines.push('');
        viewport.syncScrollArea();
        assert.equal(viewportElement.style.height, 1 * CHARACTER_HEIGHT + 'px');
        assert.equal(scrollAreaElement.style.height, 2 * CHARACTER_HEIGHT + 'px');
        done();
      }, 0);
    });
  });
});
