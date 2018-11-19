// Postcss Export confit 
// - Add's autoprefixer to vue component export pipeline
module.exports={
	plugins: [
		require('autoprefixer')({}),
    require('postcss-cssnext')({})
	]
}
