var traceur = require('traceur'),
	path = require('path');

function TraceurCompiler(config) {
	this.config = config;
	this.modules = false;
	this.shouldCompile = /^app/;

	if (typeof this.config.modules.wrapper === 'string') {
		this.modules = this.config.modules.wrapper;
	}

	if (this.config.plugins && this.config.plugins.traceur) {
		this.shouldCompile = this.config.plugins.traceur.paths || this.shouldCompile;
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

	var es5 = traceur.compile(data, {
		sourceMaps: this.config.sourceMaps,
		filename: path,
		modules: this.modules
	});

	callback(null, {
		data: es5.js,
		map: es5.generatedSourceMap
	});
};

TraceurCompiler.prototype.include = [
	path.join(__dirname, 'node_modules', 'traceur', 'bin', 'traceur-runtime.js')
];

module.exports = TraceurCompiler;
