import operations from './operations'
import suffixes from './suffixes'

const matcher = (object: any, definition: any): boolean => {
  const operationsKeys = Object.keys(operations)
  const definitionKeys = Object.keys(definition)
  const definitionEntries = Object.entries(definition)

  // Operations
  if (definitionKeys.filter(x => operationsKeys.includes(x)).length > 0) {
    if (definitionKeys.length > 1)
      throw new Error('An operation (AND, OR, NOT) must be the only attribute of its object.')

    const [operation, subDefinitions] = definitionEntries[0] as [string, any[]]

    return operations[operation](object, subDefinitions, matcher)
  }

  return definitionEntries.reduce((acc: boolean, [defKey, defValue]) => {
    // Suffixes
    for (let suffixe of Object.keys(suffixes)) {
      if (defKey.endsWith(suffixe)) {
        return acc && suffixes[suffixe](object[defKey.slice(0, -suffixe.length)], defValue, matcher)
      }
    }

    // Simple attributes
    return acc && object[defKey] == defValue
  }, true)
}

export default matcher
