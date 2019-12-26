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

  const handleSortByMethod = (identified, sortByTerm) => {
    if (sortByTerm === '' || sortByTerm === 'mostRecent') {
      return identified.sort(sortByMostRecent).reverse();
    }
    if (sortByTerm === 'firstName') {
      return identified.sort(sortByFirstName);
    }
    if (sortByTerm === 'lastName') {
      return identified.sort(sortByLastName);
    }
    return null;
  }

export default handleSortByMethod;
