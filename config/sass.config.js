
// https://www.npmjs.com/package/node-sass

module.exports = {

  /**
   * outputFilename: The filename of the saved CSS file
   * from the sass build. The directory which it is saved in
   * is set within the "buildDir" config options.
   */
    includePaths: [
       'node_modules/ionic-angular/themes',
       'node_modules/ionicons/dist/scss',
       'node_modules/ionic-angular/fonts',
       'node_modules/ionic2-custom-icons/directive/scss/',
       '.tmp-custom-icons/scss/'
    ],

    /**
     * variableSassFiles: Lists out the files which include
     * only sass variables. These variables are the first sass files
     * to be imported so their values override default variables.
     */
    variableSassFiles: [
       '{{SRC}}/theme/variables.scss',
       '.tmp-custom-icons/scss/variables.scss'
    ]

};
