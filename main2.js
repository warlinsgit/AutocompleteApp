const search = document.getElementById('search');

const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
  const res = await fetch('/state_capitals.json');
  const state_capitals = await res.json();

//  console.log(states);

//get matches to current text input

let matches = state_capitals.filter(state => {
  const regex = new RegExp(`^${searchText}`, 'gi');
  return state.name.match(regex) || state.abbr.match(regex);
});

if(searchText.length === 0){
  matches = [];
}
outputHtml(matches);


};
const outputHtml = matches => {
  if(matches.length > 0){
      const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4 class="text-danger">${match.name}(${match.abbr}) <span class="text-primary">${match.capital}</span>

                  <small class="text-success">Lat: ${match.lat} / Long: ${match.long}</small>
                </h4>
            </div>
        `).join('');
        //console.log(html);
        matchList.innerHTML = html;
  }
}

search.addEventListener('input', () => searchStates(search.value));
