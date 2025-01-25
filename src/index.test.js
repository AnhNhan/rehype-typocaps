import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified';
import { describe, expect, it } from 'vitest';
import rehypeTypocaps from './index.js';

describe('Basic functionality', () => {
  const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeTypocaps)
    .use(rehypeStringify);

  it('should handle multiple capitals', () => {
    const input = '<p>The results from MRT are back, and have been sent to FOOBAR at 2 PM, 2207 CE</p>';
    expect(processor.processSync(input).toString()).toBe('<p>The results from <span class="typocaps">MRT</span> are back, and have been sent to <span class="typocaps">FOOBAR</span> at 2 <span class="typocaps">PM</span>, 2207 <span class="typocaps">CE</span></p>');
  });

  it('should recognize parens', () => {
    const input = '<p>Articifial Intelligence (AI)</p>';
    expect(processor.processSync(input).toString()).toBe('<p>Articifial Intelligence <span class="typocaps">(AI)</span></p>');
  });

  it('should not touch single capitals', () => {
    const input = '<p>some X-rays</p>';
    expect(processor.processSync(input).toString()).toBe(input);
  });
});
