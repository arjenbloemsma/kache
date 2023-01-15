# Kitkache

Kitkache is a basic client side cache for in the browser.

Kitkache will wrap the value to be stored in an object with a timestamp. A config object defines how long the object in the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) will remain valid and when that period has passed it will retrieve a new value by calling the provided `objectLoader` callback.

Besides the period (in seconds) after which an object becomes invalid the config
can also hold a function `storeCondition` that returns a boolean, so that the
value will only be stored if the function evaluates to `true`. The value
retrieved by the `objectLoader` callback is passed as an argument to
`storeCondition` function.

## Install

Using npm:
```shell
$ npm install kitkache
```

Using yarn:
```shell
$ yarn add kitkache
```

Using pnpm:
```shell
$ pnpm add kitkache
```

## Usage

Store value of type `YourCustomType` for 2 hours

```typescript
import {kitKache} from 'kitkache'

await kitKache<YourCustomType>(
  'key',
  {expireAfterHours: 2},
  () => {
    // logic to retrieve value
    return value
  },
)
```

Store `string` value for 5 minutes, unless the value equals 'tokyo'.

```typescript
import {kitKache} from 'kitkache'

await kitKache<string>(
  'key',
  {
    expireAfterMins: 5,
    storeCondition: value => value !== 'tokyo',
  },
  () => {
    // logic to retrieve value
    return value
  },
)
```

## The config object

The configuration to be passed to the kitKache function is simple:

```typescript
{
  expireAfterSecs?: number
  expireAfterMins?: number
  expireAfterHours?: number
  storeCondition?: (value: T) => boolean
}
```

### Setting the expiration period
You can define the period after which the cache becomes invalid (and thus a new value will be retrieved) in either seconds, minutes or hours. kitKache will always choose the most specific value. So if seconds, minutes and hours have been provided, only the value for seconds will be used. If both minutes and hours have been provided, the value for minutes will be used as the expiration period.

### Providing a condition
You can also provide a condition wether a value should be stored in cache or not. The condition is a simple function that takes in a value (kitKache will automatically provide the value that is to be stored) and returns a boolean.

If the function return false, then the value will not be stored in the cache.

Imagine that the `objectLoader` retrieves an object from an external system, but that object should not be stored if the property 'fresh' in that object is set to 'true', then the condition should be something like the following:

```typescript
(value: externalObject) => !value.fresh
```

## The object loader
The `objectLoader` is an async function that returns a value. In it simplest form it could be for instance:

```typescript
() => Promise.resolve('foo')
```

In more realistic scenarios it will most likely be a function that retrieves a value from an external system.

[Project site](https://kitkache.bloemium.io)
