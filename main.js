const search = document.getElementById('search');
const matchList = document.getElementById('match-list');


//search states.json adn filter it

const searchStates = async searchText => {
  const res = await fetch('state_capitals.json');
  const states = await res.json();

  //console.log(states);

  let matches = states.filter(state => {
      const regex = new RegExp(`${searchText}`, 'gi');

      return state.name.match(regex) || state.abbr.match(regex);
  });
  if(searchText.length === 0 ){
    matches = [];
  }
  outputHtml(matches);
};

//show results in html
const outputHtml = matches => {
  if(matches.length > 0){
    const html = matches.map(
      match => `
        <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-info">${match.capital}</span></h4>
        <span>Lat: ${match.lat} /  Long: ${match.long}</span>

        </div>
      `
    ).join('');
    matchList.innerHTML = html;
  }
}

search.addEventListener('input', () => searchStates(search.value));
