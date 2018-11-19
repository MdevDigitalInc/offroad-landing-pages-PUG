![MDEV Digital](https://mdev.digital/social/githubLogo.svg)

# Pug + SASS Templating Boilerplate
## Webpack powered templating boilerplate for generating HTML pages.
This boilerplate aims to be a simple way of generating static HTML / CSS / JS
websites with some assistance from Webpack to properly output and optimize
assets.

The project requires no backend and has no framework other than vanilla Pug for
templating. Other frameworks may be added on top of this project quite easily.

### Running Project
The project is setup to run locally with live reloads so you can see your
changes directly in the browser. There is also a build function to package the
whole website into an easy to upload folder.

```bash
# Run Project Locally
npm run dev

# Build & Lint Project
npm run build

# Lint SCSS Files only
npm run lintcss
```

### PUG Templating
This project has full Pug templating support however there are a few small
caveats to be aware of. Webpack has no way of knowing which of the pug files
constitutes a full template and therefore has to be told on the
Webpack.common.js file which templates to compile into HTML

On the Webpack.common.js file look for the plugins object near the bottom of the
file. For each template you wish to compile (home, about, contact..) you will
have to create a new call to HtmlWebpackPlugin and pass it the template
information. Ignore the ExtractTextPlugin, there only needs to be one entry to
compile the SCSS files into the proper CSS.

```javascript
  ...

  plugins: [
    // Text Extraction & Chunking
    new ExtractTextPlugin("assets/styles/styles[hash].css"),
    // [ PUG + SASS Template Registration ]
    // -----------------------------------
    // Webpack needs to know which main templates to compile.
    // For every template you want to compile you must create a new
    // instance of the HtmlWebpackPlugin (https://github.com/jantimon/html-webpack-plugin)
    // and pass the "template" parameter.
    //
    // -----------------------------------
    //
    // new HtmlWebpackPlugin({
    //   template: './path/to/template.pug',
    //   filename: 'desired/path/to/output.html'
    // }),
    //
    // -----------------------------------
    //
    // If you pass a "filename" property you can assign a name and location
    // for the processed file to be placed. Otherwise it will save it to the root with the same name
    //
    // IE: filename:'./shared/footer.html' will output the template as dist/shared/footer.html
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug'
    }),
  ],

  ...
```

### Image Processing
There is a full asset optimization pipeline already in place with this project
and no further configuration is needed. You will load images into PUG templates
the same way you would in any other project. The only thing to note is that the
path to the image should always be relative to the file where it is being
called.

```pug
  // ./src/templates/index.pug
  // Image pathing is relative to the index.pug file

  div
    img(src="../../assets/images/favicon.png")
  .some-class
    Here is some text
```

### Favicon & App Link Pipeline
To speed up development and prevent things from being forgotten this project
automates the generation of Favicons and other auxiliary information for use in
apps and mobile home screens. You must make sure that the images folder contains
a file named `favicon.png` - this file will be converted into all of the
different types and sizes of favicons needed plus it will add the calls directly
to the HTML files.

This plugin also offers the ability of adding a special type of Title that is
only visible on mobile and on certain chat apps like Discord. It also includes
configuration for changing the background color of the Chrome Address Bar on
Android devices.

To configure the Title and the Address Bar color, you must edit the
webpack.prod.js file under Plugins.

```javascript
    // Process and Inject Favicon
    new FaviconsWebpackPlugin({
      logo: './assets/images/favicon.png', // Source for Favicon file
      prefix: 'icons-[hash]/', // File Prefix
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true, // Inject Calls on index.html automatically
      // CHANGE COLOR OF THEME FOR ADDRESS BAR
      background: '#13b2a9',
      // CHANGE PROJECT TITLE
      title: 'Your Title Goes Here',
      // Icons to export
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),

```

---

### [ MDEV Digital ]
We provide process-driven UX/UI + development to help our clients unleash their potential to connect with their audience. Our not-so-secret sauce is gaining a fundamental understanding of the challenges and opportunities our clients present us to provide innovative custom solutions using the latest web application technologies.

### [ Contact ]
[MDEV DIgital Website](http://mdev.digital).

[Contact Support](mailto:contact@mdev.digital).

Phone: +1(519)-860-4261


