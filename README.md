# Kitkache

Kitkache is a basic cache to be used with the
[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
of the browser.

It will wrap the value to be stored in an object with a timestamp. A config
object defines how long the object in the localStorage will remain valid and
when that period has passed it will retrieve a new value by calling the provided
`objectLoader` callback.

Besides the period (in seconds) after which an object becomes invalid the config
can also hold a function `storeCondition` that returns a boolean, so that the
value will only be stored if the function evaluates to `true`. The value
retrieved by the `objectLoader` callback is passed as an argument to
`storeCondition` function.

## Install

```shell
npm install kitkache
```

## Usage

Store value of type `YourCustomType` for 2 hours

```typescript
await kitkache<YourCustomType>(
    'key',
    {expireAfterSecs: 60 * 60 * 2}, // 2 hours
    () => {
        // logic to retrieve value
        return value
    })
```

Store `string` value for 3 days, unless the value equals 'tokyo'.

```typescript
  await kitkache<string>(
    'key',
    {
      expireAfterSecs: 60 * 60 * 24 * 3, // 3 days
      storeCondition: value => value !== 'tokyo',
    },
    () => {
      // logic to retrieve value
      return value
    },
  )
```

[Project site](https://kitkache.bloemium.io)

