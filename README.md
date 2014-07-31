# traceur-brunch

Adds [Traceur](https://github.com/google/traceur-compiler) ES6 transpiler support to [brunch](http://brunch.io).

## Usage
Install the plugin via npm with `npm install --save traceur-brunch`.

Or, do manual install:

* Add `"traceur-brunch": "x.y.z"` to `package.json` of your brunch app.
  Pick a plugin version that corresponds to your minor (y) brunch version.
* If you want to use git version of plugin, add
`"traceur-brunch": "git+https://github.com/peterjosling/traceur-brunch.git"`.

__Note:__ The entry in your `package.json` file must come before any other plugins which process Javascript (such as javascript-brunch).
