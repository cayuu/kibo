
# kibo

A virtual keyboard

![Kibo: screenshot](https://raw.githubusercontent.com/cayuu/kibo/master/screenshot.png)

> :fire: :ghost: **Work in progress**
>
> Currently `kibo`:
>
> - **Requires React**: Subsequent versions will not have this dependency.
> - **ES6+ ONLY**: Requires your tooling/pipeline support this. Subsequent versions will expose an ES5 lib.

## Usage

    npm install kibo

See `demo/demo.js` for basic usage:

```jsx
<Kibo text='kibo'>
  <input type='text'/>
</Kibo>
```

## Props

All properties are optional:

- **text**: _{String}_ An initial text string for the input
- **alignRight**: _{Boolean}_ Aligns to right of input box (default: `false`)
- **visible**: _{Boolean}_ Keyboard starts visible (default: `false`)


## Development

`kibo` is written in ES6+ and uses [Standard]() code conventions.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License

Copyright 2015 Clint Walker

Licensed under the [ISC license](http://opensource.org/licenses/ISC)
