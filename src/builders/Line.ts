import { nanoid } from 'nanoid';

// Constants
import DATA_TYPE from '@/constants/dataType';

class Line {
  key: string = nanoid();
  dataType: DATA_TYPE;
  value: unknown;
  original: unknown;
  root?: boolean;
  name?: string;
  depth: number = 0;
  last: boolean = false;
  lineNumber?: number;
  expanded: boolean = false;

  // TODO: Think better name
  constructor(dataType: DATA_TYPE) {
    this.dataType = dataType;
  }

  getKey() {
    const { key } = this;
    return key;
  }

  getDataType() {
    const { dataType } = this;
    return dataType;
  }

  setValue(value: unknown) {
    this.value  = value;
    return this;
  }

  getValue() {
    const { value } = this;
    return value;
  }

  setOriginal(original: unknown) {
    this.original = original;
    return this;
  }

  getOriginal() {
    const { original } = this;
    return original;
  }

  setName(name: string | undefined) {
    this.name = name;
    return this;
  }

  getName() {
    const { name } = this;
    return name;
  }

  setDepth(depth: number) {
    this.depth = depth;
    return this;
  }

  getDepth() {
    const { depth } = this;
    return depth;
  }

  isLast() {
    const { last } = this;
    return last;
  }

  setIsLast(last: boolean) {
    this.last = last;
    return this;
  }

  isRoot() {
    const { root } = this;
    return root;
  }

  setIsRoot() {
    this.root = true;
    return this;
  }

  setLineNumber(lineNumber: number) {
    this.lineNumber = lineNumber;
    return this;
  }

  getLineNumber() {
    const { lineNumber } = this;
    return lineNumber;
  }

  setExpanded(expanded: boolean) {
    this.expanded = expanded;
    return this;
  }

  isExpanded() {
    const { expanded } = this;
    return expanded;
  }
}

export default Line;
