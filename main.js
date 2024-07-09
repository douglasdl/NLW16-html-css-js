// object {}
const activity = {
  name: "Almoço",
  date: new Date("2024-07-09 22:00"),
  finished: true
}

const activities = [
  activity, 
  {
    name: "Academia em grupo",
    date: new Date("2024-07-10 22:00"),
    finished: false
  },
  {
    name: "Gamming session",
    date: new Date("2024-07-09 14:00"),
    finished: true
  }
]

// arrow function
const createActivityItem = (activity) => {
  let input = '<input type="checkbox" '

  if(activity.finished) {
    input += 'checked'
  }

  input += '>'

  return `
  <div>
    ${input}
    <span>${activity.name}</span>
    <time>${activity.date}</time>
  </div>
  `
}

const section = document.querySelector('section')
for(let activity of activities) {
  section.innerHTML += createActivityItem(activity)
}