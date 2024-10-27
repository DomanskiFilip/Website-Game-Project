// array to hold users
const allusers = [];
// Get all users from local storage
for (let i = 0; i < localStorage.length; i++) {
    allusers.push(localStorage.key(i));
  }
// map all users and return an object with name and score useing try and catch to fillter any errors arisen from invalid JSON data
const users = allusers.map((user) => {
    try {  // Try to parse the user data
        const userData = JSON.parse(localStorage.getItem(user));
        return {
            name: user,
            score: userData.topScore
        };
    } catch (e) { // Catch any errors
        console.error(`Error parsing data for user ${user}:`, e);
        return null; // Return null for invalid entries
    }
}).filter(user => user !== null); // Filter out invalid entries


// Sort users by score
users.sort((a, b) => b.score - a.score);

// Display users in the leaderboard
users.forEach((user, index) => {
    const tr = document.createElement('tr');
        //seperating data into table data
        const tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;

        const tdName = document.createElement('td');
        tdName.textContent = user.name;

        const tdScore = document.createElement('td');
        tdScore.textContent = user.score;

        tr.appendChild(tdIndex);
        tr.appendChild(tdName);
        tr.appendChild(tdScore);

        document.querySelector('tbody').appendChild(tr);
});