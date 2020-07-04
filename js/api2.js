const base_url = "https://api.football-data.org/v2/";
const apkey = "8abb4061217746578d242500692c8399";
const fetchAPI = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': apkey
    }
  })
  .then(res => {
    if (res.status !== 200) {
      console.log("Error: " + res.status);
      return Promise.reject(new Error(res.statusText))
    } else {
      return Promise.resolve(res)
    }
  })
  .then(res => res.json())
  .catch(err => {
    console.log(err)
  })
};

const getCompetitions = () => {
  fetchAPI(base_url+"competitions?plan=TIER_ONE")
    .then(data => {
      showCompetitions(data);
    })
    .catch(error => {
      console.log(error)
    })

}

const getCompetitionById = () =>{
  return new Promise((resolve, reject)=> {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  fetchAPI(base_url+"competitions/"+ idParam +"/standings")
    .then(data => {
      showStandings(data);
      resolve(data);
    })
    .catch(error => {
      console.log(error)
    });

    });
}


const getSaveCompetitions= () =>{
  dbGetAllCompetitions().then(competition=>{
    let competitionsHTML = document.getElementById("listfavorite");
    competition.forEach(com => {
      if (com.id > 0){
      competitionsHTML.innerHTML += `
      <tr onclick="window.location.href='./competition.html?id=${com.id}'">
        <td>${com.area.name}</td>
        <td>${com.name}</td>
        <td>${com.plan}</td>
      </tr>`;
      }
      });
  })
}

const getTeams = () =>{

  fetchAPI(`${base_url}teams`)
    .then(data => {
      showTeams(data);
    })
    .catch(error => {
      console.log(error)
    });
}

const showCompetitions = data =>{
  let competitionsHTML = document.getElementById("listcompetition");
  data.competitions.forEach(function(competition) {
    competitionsHTML.innerHTML += `
    <tr onclick="window.location.href='./competition.html?id=${competition.id}'">
      <td>${competition.area.name}</td>
      <td>${competition.name}</td>
      <td>${competition.plan}</td>
    </tr>`;
        
  });
}
const showStandings = data =>{
  let standings = "";
  let elementStanding = document.getElementById("body-content");
  data.standings[0].table.forEach(standing =>{
    standings += `
    <tr>
      <td><img src="${(standing.team.crestUrl!==null)?standing.team.crestUrl.replace(/^http:\/\//i, 'https://'):'/images/noimage.png'}" width="30px" alt="badge ${standing.team.name}"/></td>
      <td>${standing.team.name}</td>
      <td>${standing.playedGames}</td>
      <td>${standing.won}</td>
      <td>${standing.draw}</td>
      <td>${standing.lost}</td>
      <td>${standing.goalsFor}</td>
      <td>${standing.goalsAgainst}</td>
      <td>${standing.goalDifference}</td>
      <td>${standing.points}</td>
    </tr>`;
  });
  elementStanding.innerHTML = `
  <div id="fabs-card" class="section">
    <div class="row">
      <div class="col s12 m12 l12">
        <h2>${data.competition.name}</h2>
        <div class="divider"></div>
        <table class="table highlight centered">
          <thead>
            <tr class="gradient-45deg-light-blue-cyan">
              <th></th>
              <th>Team</th>
              <th>Pl</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>F</th>
              <th>A</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody id="standings">
            ${standings}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}
const showTeams = data =>{
  let teamsHTML = document.getElementById("teams");
          data.teams.forEach(team =>{
            teamsHTML.innerHTML += `
                    <div class="col s12 m12 l12">
                      <div class="card horizontal">
                        <div class="card-stacked">
                          <div class="card-content">
                            <table class="table">
                              <tr>
                                <th><img src="${(team.crestUrl!==null)?team.crestUrl.replace(/^http:\/\//i, 'https://'):'/images/noimage.png'}" width="50px" alt="badge ${team.name}"/></th>
                                <th colspan=5><b>${team.name}</b></th>
                              </tr>
                              <tr>
                                <td>Venue</td>
                                <td>:</td>
                                <td>${team.venue}</td>
                                <td>Short Name</td>
                                <td>:</td>
                                <td>${team.shortName}</td>
                              </tr>
                              <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td>${team.address}</td>
                                <td>Phone</td>
                                <td>:</td>
                                <td>${team.phone}</td>
                              </tr>
                              <tr>
                                <td>Website</td>
                                <td>:</td>
                                <td>${team.website}</td>
                                <td>Email</td>
                                <td>:</td>
                                <td>${team.email}</td>
                              </tr>
                              <tr>
                                <td>Founded</td>
                                <td>:</td>
                                <td>${team.founded}</td>
                                <td>Club Color</td>
                                <td>:</td>
                                <td>${team.clubColors}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
            `;
          });
}