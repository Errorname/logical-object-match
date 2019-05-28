import matcher from './matcher'

describe('operations', () => {
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
})
