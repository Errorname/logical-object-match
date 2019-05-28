const operations: { [name: string]: Function } = {
  OR: (object: any, subDefinitions: any[], matcher: Function) =>
    subDefinitions.reduce((acc: boolean, def: any) => acc || matcher(object, def), false),
  AND: (object: any, subDefinitions: any[], matcher: Function) =>
    subDefinitions.reduce((acc: boolean, def: any) => acc && matcher(object, def), true),
  NOT: (object: any, subDefinitions: any[], matcher: Function) =>
    !subDefinitions.reduce((acc: boolean, def: any) => acc || matcher(object, def), false)
}

export default operations
