module.exports = {
   plugins: [
       require('tailwindcss'),
       require('autoprefixer'),
       require('@fullhuman/postcss-purgecss')({
           content: [
               'index.html' // whatever your template language,
           ],
           css: ['output.css'],
           defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
       })
   ]
}