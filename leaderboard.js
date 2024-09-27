const allusers = [];
// Get all users from local storage
for (let i = 0; i < localStorage.length; i++) {
    allusers.push(localStorage.key(i));
  }
// map all users and return an object with name and score
const users = allusers.map((user) => {
return {
    name: user,
    score: JSON.parse(localStorage.getItem(user)).topScore
    }
});

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