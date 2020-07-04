const base_url = "https://api.football-data.org/v2/";
const apkey = "8abb4061217746578d242500692c8399";
const fetchAPI = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': apkey
    }
  })
};
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
function json(response) {
  return response.json();
}
function error(error) {
  console.log("Error : " + error);
}
function getCompetisi() {  
  if ('caches' in window) {
    caches.match(base_url + "matches/").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          showMatches(data);
        })
      }
    })
  }
  fetchAPI(base_url+"matches")
  .then(status)
  .then(json)
  .then(function(data) {  
    showMatches(data);
  })
  .catch(error);
}

function getTeams() {
  if ('caches' in window) {
    caches.match(base_url + "teams/").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          showTemas(data);
        })
      }
    })
  }
   fetchAPI(base_url+"teams/")
  .then(status)
  .then(json)
  .then(function(data) {  
    showTemas(data);
  })
  .catch(error);
}
  
function getTeamId() {
  return new Promise(function(resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ('caches' in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function (data) {
            showTeamDetail(data);
            resolve(data);
          })
        }
      })
    }
    fetchAPI(base_url+'teams/' + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      showTeams(data);
      resolve(data);
    });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    let articlesHTML = "";
    teams.forEach(function(data) {
      articlesHTML += `
          <table class="white center-align">
              <tbody id="body-content">
                  <tr>
                      <td class="center-align pink accent-2 white-text"><h5>${data.name}</h5>
                          <a href="/fav.html?id=${data.id}" class="btn-floating green pulse" >
                              <i class="material-icons">details</i>
                          </a>
                      </td>
                  </tr>
              </tbody>
          </table>
          <br>
      `;
    });
    document.getElementById("bodycontent").innerHTML = articlesHTML;
  })
}

function showMatches(data) {
  let tabelHTML = "";
    data.matches.forEach(function(tabl) {
      tabelHTML += `
      <tr>
        <td class="center-align pink accent-2 white-text">${tabl.competition.id}</td>
        <td class="center-align pink accent-3 white-text">${tabl.competition.area.name}</td>
        <td class="center-align pink accent-2 white-text">${tabl.competition.area.code}</td>
        <td class="center-align pink accent-3 white-text">${tabl.competition.name}</td>
      </tr>
      `;
    });
    document.getElementById("compets").innerHTML = tabelHTML;
}
function showTemas(data){
  let timHTML = "";
  data.teams.forEach(function(team) {
    timHTML += `
              <div class="col s12">
                  <div class="colo">
                      <div class="card">
                          <div class="card-content">
                              <table class="white center-align">
                                  <thead class="container">
                                      <tr class="pink accent-3">
                                          <th class="center-align white-text">${team.name}</th>
                                          <th class="center-align pink accent-2 white-text">${team.shortName}</th>
                                          <th class="center-align white-text">${team.tla}</th>
                                          <th class="center-align pink accent-2 white-text">${team.venue}</th>
                                      </tr>
                                  </thead>
                              </table>
                          </div>
                          <div class="card-action">
                              <a href="./fav.html?id=${team.id}" class="center">Detail</a>
                          </div>
                      </div>
                  </div>
              </div>
    `;
  });
  document.getElementById("team").innerHTML = timHTML;
}
function showTeamDetail(data) {
  let timIdHTML = `
              <table class="white center-align">
                  <tbody id="body-content">
                      <tr>
                          <td class="center-align pink accent-2 white-text">${data.name}</td>
                      </tr>
                      
                  </tbody>
              </table>
              <div class="row">
                  <div class="col s12 center">
                      <div class="m1 center">
                          <div class="card-image">
                              <img src="${data.crestUrl}" alt="icon">
                          </div>
                      </div>
                  </div>
                  <div class="card col s12">
                      <table>
                          <tbody>
                              <tr>
                                  <td>${data.shortName}</td>
                              </tr>
                              <tr>
                                  <td>${data.area.name}</td>
                              </tr>
                              <tr>
                                  <td>${data.address}</td>
                              </tr>
                              <tr>
                                  <td>${data.clubColors}</td>
                              </tr>
                              <tr>
                                  <td>${data.website}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <table class="white center-align">
                      <tbody id="body-content">
                          <tr>
                              <td class="center-align pink accent-2 white-text">${data.name}</td>
                          </tr>
                      </tbody>
                  </table>
                  <div class="row">
                      <div class="col s12 center">
                          <div class="m1 center">
                              <div class="card-image">
                                  <img src="${data.crestUrl}" alt="icon">
                          </div>
                      </div>
                  </div>
                  <div class="card col s12">
                      <table>
                          <tbody>
                              <tr>
                                  <td>${data.shortName}</td>
                              </tr>
                              <tr>
                                  <td>${data.area.name}</td>
                              </tr>
                              <tr>
                                  <td>${data.address}</td>
                              </tr>
                              <tr>
                                  <td>${data.clubColors}</td>
                              </tr>
                              <tr>
                                  <td>${data.website}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
        `;
        document.getElementById("body-content").innerHTML = timIdHTML;
}
function showTeams(data){
  let timIdHTML = `
    <table class="white center-align">
        <tbody id="body-content">
            <tr>
                <td class="center-align pink accent-2 white-text">${data.name}</td>
            </tr>
        </tbody>
    </table>
    <div class="row">
        <div class="col s12 center">
            <div class="m1 center">
                <div class="card-image">
                  <img src="${data.crestUrl}" alt="icon">
                </div>
            </div>
        </div>
        <div class="card col s12">
            <table>
                <tbody>
                    <tr>
                        <td>${data.shortName}</td>
                    </tr>
                    <tr>
                            <td>${data.area.name}</td>
                        </tr>
                        <tr>
                            <td>${data.address}</td>
                        </tr>
                        <tr>
                            <td>${data.clubColors}</td>
                        </tr>
                        <tr>
                            <td>${data.website}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
      `;
      document.getElementById("body-content").innerHTML = timIdHTML;
}
