const suffixes: { [suffixe: string]: Function } = {
  _not: (objValue: any, defValue: any) => objValue !== defValue,
  _not_in: (objValue: any, defValue: any[]) => !defValue.includes(objValue),
  _in: (objValue: any, defValue: any[]) => defValue.includes(objValue),
  _lt: (objValue: Number, defValue: Number) => objValue < defValue,
  _lte: (objValue: Number, defValue: Number) => objValue <= defValue,
  _gt: (objValue: Number, defValue: Number) => objValue > defValue,
  _gte: (objValue: Number, defValue: Number) => objValue >= defValue,
  _not_contains: (objValue: any, defValue: any[]) => !objValue.includes(defValue),
  _contains: (objValue: any, defValue: any[]) => objValue.includes(defValue),
  _not_starts_with: (objValue: string, defValue: string) => !objValue.startsWith(defValue),
  _starts_with: (objValue: string, defValue: string) => objValue.startsWith(defValue),
  _not_ends_with: (objValue: string, defValue: string) => !objValue.endsWith(defValue),
  _ends_with: (objValue: string, defValue: string) => objValue.endsWith(defValue),
  _every: (array: any[], definition: any, matcher: Function) =>
    array.every(item => matcher(item, definition)),
  _some: (array: any[], definition: any, matcher: Function) =>
    array.some(item => matcher(item, definition)),
  _none: (array: any[], definition: any, matcher: Function) =>
    !array.some(item => matcher(item, definition))
}

export default suffixes
