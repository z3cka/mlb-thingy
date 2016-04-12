var fs = require('fs')
  , request = require('request')
  , jsonStream = require('JSONStream')
  ;

// request({url: 'http://skimdb.npmjs.com/registry/_changes?feed=continuous&include_docs=true'})
//   .pipe(jsonStream.parse())
//   .on('data', function (data) {
//     var doc = data.doc
//     if (doc['dist-tags'] && doc['dist-tags'].latest) {
//       var latest = doc.versions[doc['dist-tags'].latest]
//       if (latest.dependencies && latest.dependencies.request) {         
//         console.log(data.id)
//       }
//     }
//   });

setInterval(function() {
  // request({url: 'http://isaacs.couchone.com/registry/_all_docs'})
  // request({url: 'http://mlb.mlb.com/gdcross/components/game/mlb/year_2016/month_04/day_11/master_scoreboard.json'})
  request({url: 'http://gd2.mlb.com/components/game/mlb/year_2016/month_04/day_11/grid.json'})
    // .pipe(jsonStream.parse('rows.*'))
    .pipe(jsonStream.stringify())
    .on('data', function (data) {
      console.log(data)
      fs.writeFile('grid_data.json', data, (err) => {
        if (err) throw err;
        // console.log('It\'s saved!');
      });
    })
}, 2000);