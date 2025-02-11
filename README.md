tgraph
===

<img src="ressources/tgraphLogo.png" width="150">

A typescript library for drawing 3D graphs
---
[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Build Status][travis-image]][travis-url]
[![CodeFactor][codefactor-image]][codefactor-url]

This module aims at drawing an interactive and modular representation of information networks.

For python jupyter notebooks use, please refer to [pytgraph](https://github.com/intv0id/pytgraph).

**Example**

[![Example graph screenshot](examples/images/GithubFollowersGraph.png)](https://intv0id.github.io/tgraph/examples/github.html)

# Usage

Examples are provided [here](https://github.com/intv0id/tgraph/tree/master/examples).

## Minimal code

* Javascript

``` js

var jsonFileName = ... ;

require.config({
    paths: {
        "jquery": "https://code.jquery.com/jquery-3.4.1.min",
        "tgraph": "https://unpkg.com/tgraph/dist/tgraph.bundle",
    }
});

require(["jquery", "tgraph"], function (jquery, tgraph) {
    jquery.getJSON(jsonFileName, function (jsonGraph) {
        let graph = new tgraph.Graph();
        graph.deserialize(jsonGraph);
        let graphView = new tgraph.GraphView('.graph', new tgraph.GraphOptions());
        graphView.draw(graph);
    });
});
```

### Options

Check the `GraphOptions` class documentation for more details.

## Graph format (JSON)

``` js
{
  "nodes": [
    {...},
    ...
  ],
  "edges": [
    {...},
    ...
  ]
}
```
### Node attributes

* name
* label (optional)
* url (optional) -> onclick default behavior
* color (optional, hexadecimal string)
* hoverColor (optional, hexadecimal string)
* size (optional)

### Edge attributes

* src
* dst
* label (optional)
* color (optional, hexadecimal string)
* size (optional)



# Contribute

Feel free to get involved in this project and submit your pull requests. If you find any bug please feel free to [create a ticket](https://github.com/intv0id/tgraph/issues/new).

## Roadmap

* [ ] Documentation
* [ ] Unit tests

# Credits

This module is based on the [jgraph](https://github.com/patrickfuller/jgraph) work and is under the MIT License.

[npm-image]: https://img.shields.io/npm/v/tgraph.svg
[npm-downloads]: https://img.shields.io/npm/dt/tgraph.svg
[npm-url]: https://www.npmjs.com/package/tgraph
[travis-url]: https://travis-ci.org/intv0id/tgraph
[travis-image]: https://travis-ci.org/intv0id/tgraph.svg?branch=master
[codefactor-url]: https://www.codefactor.io/repository/github/intv0id/tgraph
[codefactor-image]: https://www.codefactor.io/repository/github/intv0id/tgraph/badge
