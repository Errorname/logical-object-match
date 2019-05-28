# logical-object-match

Logical match of a JS object based on a definition. (Inspired from [Prisma](https://www.prisma.io/)'s filtering system)

## Installation

```bash
npm install logical-object-match
```

## Usage

You can match a single object based on a definition

```js
import matcher from 'logical-object-match'

const movie = {
  title: 'Lost in Translation',
  rating: 95,
  genre: 'Comedy',
  cast: ['Bill Murray', 'Scarlett Johansson']
}

matcher(movie, {
  title: 'Lost in Translation',
  genre: 'Comedy'
}) // true

matcher(movie, {
  AND: [
    { rating_gte: 90 },
    { title_starts_with: 'Lost' },
    {
      OR: [
        { genre_in: ['Comedy', 'Thriller'] },
        { cast_not_contains: 'Jude Law' },
        { NOT: [{ rating_lt: 50 }] }
      ]
    }
  ]
}) // true
```

Or you can filter an array of objects based on a definition

```js
import matcher from 'logical-object-match'

const movies = [
  {
    title: 'Lost in Translation',
    rating: 95
  },
  {
    title: 'John Wick',
    rating: 86
  },
  {
    title: 'The Last Airbender',
    rating: 5
  }
]

const goodMovies = movies.filter(movie => matcher(movie, { rating_gte: 85 }))
// Will return an array with the Lost in Translation and John Wick objects
```

## Documentation

### Operations

You can use the filter combinators `OR`, `AND` and `NOT` to create an arbitrary logical combination of matching conditions:

- For an `AND`-filter to evaluate to true, **all** of the nested conditions have to be `true`.

```js
let def = {
  AND: [
    { title: 'Lost in Translation' },
    { rating_gte: 90 },
    { genre_in: ['Comedy', 'Thriller'] },
    { cast_contains: 'Bill Murray' }
  ]
}
```

- For an `OR`-filter to evaluate to true, **at least one** of the nested conditions has to be `true`.

```js
let def = {
  OR: [
    { title: 'John Wick' },
    { rating_gte: 90 },
    { genre_in: ['Drame', 'Thriller'] },
    { cast_contains: 'Scarlett Johansson' }
  ]
}
```

- For a `NOT`-filter to evaluate to true, **all** of the nested conditions have to be `false`.

```js
let def = {
  NOT: [
    { title: 'The Last Airbender' },
    { rating_lt: 50 },
    { genre_not_in: ['Comedy', 'Thriller'] },
    { cast_contains: 'Jude Law' }
  ]
}
```

### Suffixes

You can use suffixes for more matching conditions:

- [`_not`](#not)
- [`_in`](#in) and [`_not_in`](#in)
- [`_lt`](#lt) and [`_lte`](#lt)
- [`_gt`](#gt) and [`_gte`](#gt)
- [`_contains`](#contains) and [`_not_contains`](#contains)
- [`_starts_with`](#starts-with) and [`_not_starts_with`](#starts-with)
- [`_ends_with`](#ends-with) and [`_not_ends_with`](#ends-with)
- [`_every`](#every)
- [`_some`](#some)
- [`_none`](#none)

---

<a id="not"></a>

- `_not` requires the attribute not to be the given value

```js
let def = {
  title_not: 'Star Wars'
}
```

<a id="in"></a>

- `_in` and `_not_in` requires the attribute to be one of the given value

```js
let def = {
  genre_in: ['Comedy', 'Thriller']
}
let def = {
  genre_not_in: ['Drame', 'Thriller']
}
```

<a id="lt"></a>

- `_lt` and `_lte` requires the attribute to be less than (or equal) the given number

```js
let def = {
  rating_lt: 98
}
let def = {
  rating_lte: 98
}
```

<a id="gt"></a>

- `_gt` and `_gte` requires the attribute to be greater than (or equal) the given number

```js
let def = {
  rating_gt: 50
}
let def = {
  rating_gte: 50
}
```

<a id="contains"></a>

- `_contains` and `_not_contains` requires the attribute to contains the given value

```js
let def = {
  cast_contains: 'Scarlett Johansson'
}
let def = {
  cast_not_contains: 'Jude Law'
}
```

<a id="starts-with"></a>

- `_starts_with` and `_not_starts_with` requires the attribute to starts with the given string

```js
let def = {
  title_starts_with: 'Lost'
}
let def = {
  title_not_starts_with: 'Star'
}
```

<a id="ends-with"></a>

- `_ends_with` and `_not_ends_with` requires the attribute to ends with the given string

```js
let def = {
  title_ends_with: 'Translation'
}
let def = {
  title_not_ends_with: 'Wars'
}
```

<a id="every"></a>

- `_every` requires all items of the array to match the given definition

```js
let def = {
  movies_every: {
    rating_gte: 80
  }
}
```

<a id="some"></a>

- `_some` requires at least one of the items of the array to match the given definition

```js
let def = {
  movies_some: {
    rating_gte: 90
  }
}
```

<a id="none"></a>

- `_none` requires that none of the items of the array match the given definition

```js
let def = {
  movies_none: {
    rating_gte: 60
  }
}
```
