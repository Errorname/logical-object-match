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
})
