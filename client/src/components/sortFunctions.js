  const sortByFirstName = (a, b) => {
    const a_artist = a.artist_name.replace('The ', '');
    const b_artist = b.artist_name.replace('The ', '');
    if (a_artist < b_artist) {
      return -1;
    } else if (a_artist > b_artist) {
      return 1;
    } else {
      return 0
    }
  }

  const sortByLastName = (a, b) => {
    const a_artist = a.last_name;
    const b_artist = b.last_name;
    if (a_artist < b_artist) {
      return -1;
    } else if (a_artist > b_artist) {
      return 1;
    } else {
      return 0
    }
  }

  const sortByMostRecent = (a, b) => {
    const a_artist = a.entry_number;
    const b_artist = b.entry_number;
    if (a_artist < b_artist) {
      return -1;
    } else if (a_artist > b_artist) {
      return 1;
    } else {
      return 0
    }
  }

  export const byYear = (a, b) => a.year - b.year;

  export const byEntryNumber = (a, b) => a.entry_number - b.entry_number

  export const handleSortByMethod = (identified, sortByTerm) => {
    if (sortByTerm === '' || sortByTerm === 'mostRecent') {
      return identified.slice().sort(sortByMostRecent).reverse();
    }
    if (sortByTerm === 'firstName') {
      return identified.slice().sort(sortByFirstName);
    }
    if (sortByTerm === 'lastName') {
      return identified.slice().sort(sortByLastName);
    }
    return null;
  }
