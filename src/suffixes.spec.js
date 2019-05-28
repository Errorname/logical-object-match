import matcher from './matcher'

describe('suffixes', () => {
  test('not', () => {
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
  })

  test('not in', () => {
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
  })

  test('in', () => {
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
  })

  test('lt', () => {
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
  })

  test('lte', () => {
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
  })

  test('gt', () => {
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
  })

  test('gte', () => {
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
  })

  test('not contains', () => {
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
  })

  test('contains', () => {
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
  })

  test('not starts with', () => {
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
  })

  test('starts with', () => {
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
  })

  test('not ends with', () => {
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
  })

  test('ends with', () => {
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
  })

  test('every', () => {
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
  })

  test('some', () => {
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
  })

  test('none', () => {
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
