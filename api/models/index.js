var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack', {useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Page;
var User;

var Schema = mongoose.Schema;

var pageSchema = new Schema({ // Schema describes the model 
  title: {
    type: String,
    required: true
  },
  url_name: String,
  owner_id: String,
  body: {
    type: String,
    required: true
  },
  // date: Date,
  date: {
    type: Date,
    default: Date.now
  },
  status: Number,
  tags: {
    type: [String],
    get: function(tags) {
      return tags.join(", ");
    }
  }
})

var userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: String,
  isAdmin: Boolean
})

// pageSchema.methods.computeUrlName = function() {
//   if (this.title.length > 0) { // undefined is taken care of in model, required: true
//     this.url_name = this.title.replace(/[\W\s]/g, '_');
//   }
// }
// pageSchema.pre('save', function(next) {
//   this.computeUrlName();
//   next();
// })

pageSchema.virtual('full_route').get(function() { //what is .get
  return "/wiki/" + this.url_name; // why add wiki?
})

// pageSchema.virtual('humanReadableDate').get(function() {
//   console.log('VIRT', this.date)
//   return this.date.toString(); 
// })

// pageSchema.virtual('full_route') { Why not this?
//   return "/wiki/" + url_name;
// })
// how do you get the virtual? Page.virtual? 


Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);

module.exports = {
  "Page": Page,
  "User": User // how does this work?
};