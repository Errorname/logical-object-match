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

const matcher = (object: any, definition: any): boolean => {
  const definitionKeys = Object.keys(definition)
  const definitionEntries = Object.entries(definition)

  if (
    definitionKeys.includes('OR') ||
    definitionKeys.includes('AND') ||
    definitionKeys.includes('NOT')
  ) {
    if (definitionKeys.length > 1) throw new Error()

    const [operation, subDefinitions] = definitionEntries[0] as [string, any[]]

    switch (operation) {
      case 'OR':
        return subDefinitions.reduce((acc: boolean, def: any) => acc || matcher(object, def), false)
      case 'AND':
        return subDefinitions.reduce((acc: boolean, def: any) => acc && matcher(object, def), true)
      case 'NOT':
        return !subDefinitions.reduce(
          (acc: boolean, def: any) => acc || matcher(object, def),
          false
        )
    }
  }

  return definitionEntries.reduce((acc: boolean, [defKey, defValue]) => {
    for (let suffixe of Object.keys(suffixes)) {
      if (defKey.endsWith(suffixe)) {
        return acc && suffixes[suffixe](object[defKey.slice(0, -suffixe.length)], defValue, matcher)
      }
    }

    return acc && object[defKey] == defValue
  }, true)
}

/*
  TODO:
  - Documentation
  - Refactor
  - Better type checking in suffixes and operation
*/

export default matcher
