const fs = require('fs');
const archiver = require('archiver');

function create(version) {
	const output = fs.createWriteStream(`${__dirname}/readsonic-wordpress-plugin-${version}.zip`);
	const archive = archiver('zip', {
		zlib: { level: 9 }
	});

	output.on('close', () => {
		console.log(`${archive.pointer()} total bytes`);
		console.log('archiver has been finalized and the output file descriptor has closed.');
	});

	archive.on('warning', (err) => {
		if (err.code === 'ENOENT') {
			console.warn(err);
		} else {
			throw err;
		}
	});

	archive.on('error', (err) => {
		throw err;
	});

	archive.pipe(output);

	archive.directory('assets/', 'assets');
	archive.directory('build/', 'build');
	archive.file('readsonic.php');
	archive.file('readsonic-settings.php');
	archive.file('widget.php');
	archive.file('readme.txt');

	archive.finalize();
}

create(process.argv[2]);
