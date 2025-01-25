import { isElement } from 'hast-util-is-element';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

const rehypeTypocaps = ({ element = 'p', className = 'typocaps' } = {}) => {
  return tree =>
    visit(tree, 'element', node => {
      // parse only paragraphs
      if (typeof element === 'string' ? !isElement(node, 'p') : !element.every(el => isElement(node, el))) {
        return;
      }

      if (node.children.length === 0) {
        return;
      }

      node.children = node.children.flatMap(c => {
        if (c.type !== 'text') {
          return [c];
        }

        const regexp = /[[\](){}]*[A-Z]{2,}[[\](){}]*/;
        const elements = [];
        let value = c.value;
        let match;

        while ((match = regexp.exec(value))) {
          const index = match.index;
          const text = match[0];

          if (index !== 0) {
            elements.push({ type: 'text', value: value.slice(0, index) });
          }

          elements.push(h('span', { class: className }, text));
          value = value.slice(index + text.length);
        }

        elements.push({ type: 'text', value: value });

        return elements;
      });
    });
};

export default rehypeTypocaps;
