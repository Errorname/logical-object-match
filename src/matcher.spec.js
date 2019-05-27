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
          NOT: { name: 'Errorname' }
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
          NOT: { name: 'Thibaud' }
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
          NOT: { pet: 'cat' }
        }
      )
    }).toThrow()
  })

  test('complex example', () => {
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
              AND: [{ pet: 'cat' }, { NOT: { petName: 'Roger' } }]
            }
          ]
        }
      )
    ).toBe(true)
  })
})
