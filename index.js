var traceur = require('traceur'),
	path = require('path');

function TraceurCompiler(config) {
	this.shouldCompile = /^app/;
	this.options = {
		modules: false,
		sourceMaps: config.sourceMaps
	};

	if (typeof config.modules.wrapper === 'string') {
		this.options.modules = config.modules.wrapper;
	}

	if (config.plugins && config.plugins.traceur) {
		this.shouldCompile = config.plugins.traceur.paths || this.shouldCompile;

		for (var i in config.plugins.traceur.options) {
			this.options[i] = config.plugins.traceur.options[i];
		}
	}
}

TraceurCompiler.prototype.brunchPlugin = true;
TraceurCompiler.prototype.type = 'javascript';
TraceurCompiler.prototype.extension = 'js';

TraceurCompiler.prototype.compile = function(data, path, callback) {
	// Only compile from the specified paths.
	if (!this.shouldCompile.test(path)) {
		return callback(null, {data: data});
	}

	this.options.filename = path;

	var es5 = traceur.compile(data, this.options);

	if (es5.errors && es5.errors.length > 0) {
		callback(es5.errors);
		return;
	}

	callback(null, {
		data: es5.js,
		map: es5.generatedSourceMap
	});
};

TraceurCompiler.prototype.include = [
	path.join(__dirname, 'node_modules', 'traceur', 'bin', 'traceur-runtime.js')
];

module.exports = TraceurCompiler;
