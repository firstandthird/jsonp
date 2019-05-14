# JSONP

[![Build Status](https://travis-ci.org/firstandthird/jsonp.svg?branch=master)](https://travis-ci.org/firstandthird/jsonp)
![npm](https://img.shields.io/npm/v/@firstandthird/jsonp.svg)

Quick and easy JSONP.

## Installation

```sh
npm install @firstandthird/jsonp
```

## Usage

```js
import jsonp from '@firstandthird/jsonp';

jsonp('https://some-url.io', () => {
  // It finished
}, 'cb');

// https://some-url.io?cb=jsonp_125149012 will be queried
```
