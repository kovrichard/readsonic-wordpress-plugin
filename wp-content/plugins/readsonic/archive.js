const fs = require( 'fs' );
const archiver = require( 'archiver' );

function create() {
	const output = fs.createWriteStream( `${ __dirname }/readsonic.zip` );
	const archive = archiver( 'zip', {
		zlib: { level: 9 },
	} );

	output.on( 'close', () => {
		// eslint-disable-next-line no-console
		console.log( `${ archive.pointer() } total bytes` );
		// eslint-disable-next-line no-console
		console.log(
			'archiver has been finalized and the output file descriptor has closed.'
		);
	} );

	archive.on( 'warning', ( err ) => {
		if ( err.code === 'ENOENT' ) {
			// eslint-disable-next-line no-console
			console.warn( err );
		} else {
			throw err;
		}
	} );

	archive.on( 'error', ( err ) => {
		throw err;
	} );

	archive.pipe( output );

	archive.directory( 'assets/', 'assets' );
	archive.directory( 'build/', 'build' );
	archive.file( 'readsonic.php' );
	archive.file( 'readsonic-settings.php' );
	archive.file( 'widget.php' );
	archive.file( 'readme.txt' );

	archive.finalize();
}

create();
