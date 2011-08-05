
/**
 * Module dependencies.
 */

var fs = require('fs')
  , jade = require('jade');

var files = JSON.parse(fs.readFileSync('docs.json', 'utf8'))
  , out = fs.createWriteStream('page.html');

var docs = files['lib/superagent.js'];

var pending = 0;
docs.forEach(function(doc){
  ++pending;
  jade.renderFile('doc.jade', { locals: { doc: doc }}, function(err, html){
    if (err) throw err;
    out.write(html);
    --pending || out.end();
  });
});