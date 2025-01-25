import { Root } from 'hast'
import { Plugin } from 'unified';

declare const rehypeTypocaps: Plugin<[{ element?: string | string[]; className?: string; }?,], Root>;

export default rehypeTypocaps;
