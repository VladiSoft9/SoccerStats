const PlCard = document.getElementById('PlCard')
const ClCard = document.getElementById('ClCard')


// Fetching and showing data about the players

async function getPlayerStats() {
    const player = document.getElementById('player').value
    const apiKey = 'd93580e4f024b16c3dd0133b3c6505cc5704838560a22aa9290d963dbd5ac26a';
    const url = `https://apiv3.apifootball.com/?action=get_players&player_name=${player}&APIkey=${apiKey}`
    


    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error('Could not fetch the stats!')
        }
        const data = await response.json()
        console.log(data)
        displayResultPlayer(data)

    }
    catch(error){
        console.error()
        displayErrorPlayer()
    }
}

function displayResultPlayer(data){

    
    const player0 = data[0]
    const player1 = data[1]

    const {player_name, player_image, player_age, player_birthdate, player_type, player_rating, player_goals, team_name, player_saves, player_inside_box_saves, player_goals_conceded, player_assists, player_passes, player_passes_accuracy, player_interceptions, team_key} = player1
    const {player_tackles} = player0

    // Clear previous data before adding new data
    PlCard.textContent = ""
    ClCard.textContent = ""
    

    const PlImage = document.createElement('img')
    PlImage.src = player_image
    PlImage.alt = 'No image available!'
    PlImage.style.display = 'block'
    PlCard.appendChild(PlImage)


    const PlName = document.createElement('h2')
    PlName.textContent = player_name
    PlCard.appendChild(PlName)

    const PlAge = document.createElement('p')
    PlAge.textContent = `Player age: ${player_age}`
    PlCard.appendChild(PlAge)


    const PlBday = document.createElement('p')
    PlBday.textContent = `Date of birth: ${player_birthdate}`
    PlCard.appendChild(PlBday)

    const PlType = document.createElement('p')
    PlType.textContent = `Position: ${player_type}`
    PlCard.appendChild(PlType)

    const PlRating = document.createElement('p')
    if(!player_rating == ""){
        PlRating.textContent = `Avarage rating for the season: ${player_rating}`
    }
    else{
        PlRating.textContent = 'Avarage rating for the season: Not played this season!'
    }
    PlCard.appendChild(PlRating)

    const PlGoals = document.createElement('p')
    if(!player_goals == ""){
        PlGoals.textContent = `Goals scored: ${player_goals}`
    }
    else{
        PlGoals.textContent = 'Goals scored: No scoring record!'
    }
    PlCard.appendChild(PlGoals)

    const PlAssists = document.createElement('p')
    if(!player_assists == ''){
        PlAssists.textContent = `Total assists: ${player_assists}`
    }
    else{
        PlAssists.textContent = 'Total assists: No current record!'
    }
    PlCard.appendChild(PlAssists)

    const PlPassAcc = document.createElement('p')
    const AccPercentage = Math.round((player_passes_accuracy / player_passes) * 100).toFixed(0) 
    if(isNaN(AccPercentage)){
        PlPassAcc.textContent = `Pass accuracy: No data for this season!`
    }   
    else{
        PlPassAcc.textContent = `Pass accuracy: ${AccPercentage}%`
    }
    PlCard.appendChild(PlPassAcc)

    const PlTackles = document.createElement('p')
    if(!player_tackles == ''){
        PlTackles.textContent = `Completed tackles: ${player_tackles}`
    }
    else{
        PlTackles.textContent = `Completed tackles: No current record!`
    }
    PlCard.appendChild(PlTackles)

    const PlInt = document.createElement('p')
    if(!player_interceptions == ''){
        PlInt.textContent = `Successful interception: ${player_interceptions}`
    }
    else{
        PlInt.textContent = `Successful interception: No current record!`
    }
    PlCard.appendChild(PlInt)

    const PlTeam = document.createElement('p')
    PlTeam.textContent = `Team or Country: ${team_name}`
    PlCard.appendChild(PlTeam)

    const PlTeamKey = document.createElement('p')
    PlTeamKey.setAttribute('id', 'teamKey')
    PlTeamKey.textContent = team_key
    PlTeamKey.style.display = 'none'
    PlCard.appendChild(PlTeamKey)

    const PlSaves = document.createElement('p')
    if(player_type == 'Goalkeepers'){
        PlSaves.textContent = `Total saves: ${player_saves}`
        PlCard.appendChild(PlSaves)
    }
    

    const PlIBSaves = document.createElement('p')
    if(player_type == 'Goalkeepers'){
        PlIBSaves.textContent = `Total 'inside-box' saves: ${player_inside_box_saves}`
        PlCard.appendChild(PlIBSaves)
    }

   const PlGConceded = document.createElement('p')
   if(player_type == 'Goalkeepers'){
       PlGConceded.textContent = `Total goals conceded: ${player_goals_conceded}`
       PlCard.appendChild(PlGConceded)
    }

}

function displayErrorPlayer(){

    // Clear previous data before adding new data
    PlCard.textContent = ""
    ClCard.textContent = ""

    const errorDisplayPlayer = document.createElement('h2')
    errorDisplayPlayer.textContent = 'Sorry! This player is not in our system! Try some other name!'
    PlCard.appendChild(errorDisplayPlayer)
}

// Fetching and showing data about the teams

async function getTeamStats() {
    const team = document.getElementById('teamKey').textContent
    const apiKey = 'd93580e4f024b16c3dd0133b3c6505cc5704838560a22aa9290d963dbd5ac26a';
    const urlTeam = `https://apiv3.apifootball.com/?action=get_teams&team_id=${team}&APIkey=${apiKey}`
    


    try{
        const response = await fetch(urlTeam)
        if(!response.ok){
            throw new Error('Could not fetch the stats!')
        }
        const TeamData = await response.json()
        console.log(TeamData)
        displayResultTeam(TeamData)
        

    }
    catch(error){
        console.error()
        displayErrorTeam()
        
    }
}

function displayResultTeam(TeamData){

    const [{team_name, team_badge, team_founded, team_country, venue: {venue_name, venue_city, venue_capacity }, coaches: [{coach_name}] }] = TeamData

    // Clear previous data before adding new data
    ClCard.textContent = ""
    

    const TeImage = document.createElement('img')
    TeImage.src = team_badge
    TeImage.alt = 'No image available!'
    TeImage.style.display = 'block'
    ClCard.appendChild(TeImage)


    const TeName = document.createElement('h2')
    TeName.textContent = team_name
    ClCard.appendChild(TeName)

    const TeYear = document.createElement('p')
    TeYear.textContent = `Year founded: ${team_founded}`
    ClCard.appendChild(TeYear)

    const TeCountry = document.createElement('p')
    TeCountry.textContent = `Team Country: ${team_country}`
    ClCard.appendChild(TeCountry)

    const TeStadiumName = document.createElement('p')
    TeStadiumName.textContent = `Home ground: ${venue_name} - ${venue_city}`
    ClCard.appendChild(TeStadiumName)

    const TeStadiumCapac = document.createElement('p')
    TeStadiumCapac.textContent = `Ground capacity: ${venue_capacity} people`
    ClCard.appendChild(TeStadiumCapac)

    const TeCoach = document.createElement('p')
    TeCoach.textContent = `Head coach: ${coach_name}`
    ClCard.appendChild(TeCoach)

}

function displayErrorTeam(){

    // Clear previous data before adding new data
    ClCard.textContent = ""

    const errorDisplayTeam = document.createElement('h2')
    errorDisplayTeam.textContent = 'Sorry! This team is not in our system!'
    ClCard.appendChild(errorDisplayTeam)
}
 


