const suffixes: { [suffixe: string]: Function } = {
  _not: (objValue: any, defValue: any) => objValue !== defValue,
  _not_in: (objValue: any, defValue: any[]) => !defValue.includes(objValue),
  _in: (objValue: any, defValue: any[]) => defValue.includes(objValue),
  _lt: (objValue: any, defValue: any[]) => objValue < defValue,
  _lte: (objValue: any, defValue: any[]) => objValue <= defValue,
  _gt: (objValue: any, defValue: any[]) => objValue > defValue,
  _gte: (objValue: any, defValue: any[]) => objValue >= defValue,
  _not_contains: (objValue: any, defValue: any[]) => !objValue.includes(defValue),
  _contains: (objValue: any, defValue: any[]) => objValue.includes(defValue),
  _not_starts_with: (objValue: any, defValue: any[]) => !objValue.startsWith(defValue),
  _starts_with: (objValue: any, defValue: any[]) => objValue.startsWith(defValue),
  _not_ends_with: (objValue: any, defValue: any[]) => !objValue.endsWith(defValue),
  _ends_with: (objValue: any, defValue: any[]) => objValue.endsWith(defValue)
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

    const [operation, subDefinitions] = definitionEntries[0]

    switch (operation) {
      case 'OR':
        return (subDefinitions as any[]).reduce(
          (acc: boolean, def: any) => acc || matcher(object, def),
          false
        )
      case 'AND':
        return (subDefinitions as any[]).reduce(
          (acc: boolean, def: any) => acc && matcher(object, def),
          true
        )
      case 'NOT':
        return !(subDefinitions as any[]).reduce(
          (acc: boolean, def: any) => acc || matcher(object, def),
          false
        )
    }
  }

  // Check each field of definition
  return definitionEntries.reduce((acc: boolean, [defKey, defValue]) => {
    const suffixesKeys = Object.keys(suffixes)

    for (let suffixe of suffixesKeys) {
      if (defKey.endsWith(suffixe)) {
        return acc && suffixes[suffixe](object[defKey.slice(0, -suffixe.length)], defValue)
      }
    }

    return acc && object[defKey] == defValue
  }, true)
}

/*
  TODO:
  - Finish suffixes
  - Documentation
  - Refactor
  - Better type checking in suffixes and operation

  TODO:
  _every
  _some
  _none
*/

export default matcher
