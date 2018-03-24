const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ultra-village');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

let Artist;
let Page;
let User;

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  artist_name: {
    type:[String],
    get: artist_name => {
      return artist_name.join(", ");
    }
  },
  pages: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Page'
  }]
});

const pageSchema = new Schema({ // Schema describes the model 
  artist_name: [{ 
    type: String
  }],
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
  created_date: {
    type: Date,
    default: Date.now
  },
  status: Number,
  tags: {
    type: [String],
    get: tags => {
      return tags.join(", ");
    }
  }
});

const userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: String,
  isAdmin: Boolean
});

pageSchema.virtual('full_route').get(function() { //what is .get
  return "/wiki/" + this.url_name; // why add wiki?
});

// pageSchema.virtual('humanReadableDate').get(function() {
//   console.log('VIRT', this.date)
//   return this.date.toString(); 
// })

Artist = mongoose.model('Artist', artistSchema);
Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);

module.exports = {
  "Artist": Artist,
  "Page": Page,
  "User": User
};