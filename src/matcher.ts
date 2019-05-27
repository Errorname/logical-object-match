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
        return subDefinitions.reduce((acc, def) => acc || matcher(object, def), false)
      case 'AND':
        return subDefinitions.reduce((acc, def) => acc && matcher(object, def), true)
      case 'NOT':
        return !matcher(object, subDefinitions)
    }
  }

  // Check each field of definition
  return definitionEntries.reduce((acc, [key, value]) => acc && object[key] == value, true)
}

/*
  TODO:
  _not
  _in
  _not_in
  _lt
  _lte
  _gt
  _gte
  _contains
  _not_contains
  _contains_every
  _contains_some
  _starts_with
  _not_starts_with
  _ends_with
  _not_ends_with
  
  _every
  _some
  _none
*/

export default matcher
