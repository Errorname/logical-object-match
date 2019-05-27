import matcher from './matcher'

describe('matcher', () => {
  test('one field', () => {
    expect(
      matcher(
        {
          name: 'Thibaud'
        },
        {
          name: 'Thibaud'
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud'
        },
        {
          name: 'Errorname'
        }
      )
    ).toBe(false)
  })

  test('multiple fields', () => {
    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          name: 'Thibaud',
          pet: 'cat'
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          name: 'Thibaud',
          pet: 'dog'
        }
      )
    ).toBe(false)
  })

  test('OR operation', () => {
    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          OR: [{ name: 'Thibaud' }, { pet: 'cat' }]
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          OR: [{ name: 'Errorname' }, { pet: 'dog' }]
        }
      )
    ).toBe(false)

    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          OR: [{ name: 'Thibaud' }, { pet: 'dog' }]
        }
      )
    ).toBe(true)

    expect(() => {
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          name: 'Thibaud',
          OR: [{ pet: 'cat' }]
        }
      )
    }).toThrow()
  })

  test('AND operation', () => {
    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          AND: [{ name: 'Thibaud' }, { pet: 'cat' }]
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          AND: [{ name: 'Thibaud' }, { pet: 'dog' }]
        }
      )
    ).toBe(false)

    expect(() => {
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          name: 'Thibaud',
          AND: [{ pet: 'cat' }]
        }
      )
    }).toThrow()
  })

  test('NOT operation', () => {
    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          NOT: [{ name: 'Errorname' }, { pet: 'dog' }]
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          NOT: [{ name: 'Thibaud' }, { pet: 'dog' }]
        }
      )
    ).toBe(false)

    expect(() => {
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat'
        },
        {
          name: 'Thibaud',
          NOT: [{ pet: 'cat' }]
        }
      )
    }).toThrow()
  })

  test('complex operations example', () => {
    expect(
      matcher(
        {
          name: 'Thibaud',
          pet: 'cat',
          petName: 'Tyché'
        },
        {
          OR: [
            { name: 'Errorname' },
            {
              AND: [{ pet: 'cat' }, { NOT: [{ petName: 'Roger' }] }]
            }
          ]
        }
      )
    ).toBe(true)
  })

  test('suffixes', () => {
    // not
    expect(
      matcher(
        {
          name: 'Thibaud'
        },
        {
          name_not: 'Errorname'
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud'
        },
        {
          name_not: 'Thibaud'
        }
      )
    ).toBe(false)

    // not in
    expect(
      matcher(
        {
          name: 'Thibaud'
        },
        {
          name_not_in: ['Errorname', 'Roger']
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud'
        },
        {
          name_not_in: ['Thibaud', 'Errorname']
        }
      )
    ).toBe(false)

    // in
    expect(
      matcher(
        {
          name: 'Thibaud'
        },
        {
          name_in: ['Thibaud', 'Errorname']
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud'
        },
        {
          name_in: ['Errorname', 'Roger']
        }
      )
    ).toBe(false)

    // lt
    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_lt: 1700
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_lt: 1500
        }
      )
    ).toBe(false)

    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_lt: 1300
        }
      )
    ).toBe(false)

    // lte
    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_lte: 1700
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_lte: 1500
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_lt: 1300
        }
      )
    ).toBe(false)

    // gt
    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_gt: 1300
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_gt: 1500
        }
      )
    ).toBe(false)

    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_gt: 1700
        }
      )
    ).toBe(false)

    // gte
    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_gte: 1300
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_gte: 1500
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          money: 1500
        },
        {
          money_gte: 1700
        }
      )
    ).toBe(false)

    // not contains
    expect(
      matcher(
        {
          name: 'Thibaud (Errorname) Courtoison'
        },
        {
          name_not_contains: 'Roger'
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud (Errorname) Courtoison'
        },
        {
          name_not_contains: 'Errorname'
        }
      )
    ).toBe(false)

    // contains
    expect(
      matcher(
        {
          name: 'Thibaud (Errorname) Courtoison'
        },
        {
          name_contains: 'Errorname'
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud (Errorname) Courtoison'
        },
        {
          name_contains: 'Roger'
        }
      )
    ).toBe(false)

    // not starts with
    expect(
      matcher(
        {
          name: 'Thibaud Courtoison'
        },
        {
          name_not_starts_with: 'Errorname'
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud Courtoison'
        },
        {
          name_not_starts_with: 'Thibaud'
        }
      )
    ).toBe(false)

    // starts with
    expect(
      matcher(
        {
          name: 'Thibaud Courtoison'
        },
        {
          name_starts_with: 'Thibaud'
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud Courtoison'
        },
        {
          name_starts_with: 'Errorname'
        }
      )
    ).toBe(false)

    // not ends with
    expect(
      matcher(
        {
          name: 'Thibaud Courtoison'
        },
        {
          name_not_ends_with: 'Errorname'
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud Courtoison'
        },
        {
          name_not_ends_with: 'Courtoison'
        }
      )
    ).toBe(false)

    // starts with
    expect(
      matcher(
        {
          name: 'Thibaud Courtoison'
        },
        {
          name_ends_with: 'Courtoison'
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          name: 'Thibaud Courtoison'
        },
        {
          name_ends_with: 'Errorname'
        }
      )
    ).toBe(false)

    // every
    expect(
      matcher(
        {
          movies: [{ name: 'Lost in Translation', rating: 95 }, { name: 'John Wick', rating: 86 }]
        },
        {
          movies_every: { rating_gte: 85 }
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          movies: [{ name: 'Lost in Translation', rating: 95 }, { name: 'John Wick', rating: 86 }]
        },
        {
          movies_every: { name_starts_with: 'Lost' }
        }
      )
    ).toBe(false)

    // some
    expect(
      matcher(
        {
          movies: [{ name: 'Lost in Translation', rating: 95 }, { name: 'John Wick', rating: 86 }]
        },
        {
          movies_some: { rating_gte: 90 }
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          movies: [{ name: 'Lost in Translation', rating: 95 }, { name: 'John Wick', rating: 86 }]
        },
        {
          movies_some: { name_starts_with: 'Star' }
        }
      )
    ).toBe(false)

    // none
    expect(
      matcher(
        {
          movies: [{ name: 'Lost in Translation', rating: 95 }, { name: 'John Wick', rating: 86 }]
        },
        {
          movies_none: { rating_lte: 80 }
        }
      )
    ).toBe(true)

    expect(
      matcher(
        {
          movies: [{ name: 'Lost in Translation', rating: 95 }, { name: 'John Wick', rating: 86 }]
        },
        {
          movies_none: { name_starts_with: 'Lost' }
        }
      )
    ).toBe(false)
  })
})
