// Libraries and packages
const formatter = (date) => {
  // console.log(dayjs(date).format('hh:mm'))
  return {
    day: {
      numeric: dayjs(date).format('DD'),
      week: {
        short: dayjs(date).format('ddd'),
        long: dayjs(date).format('dddd')
      }
    },
    month: dayjs(date).format('MMMM'),
    hour: dayjs(date).format('HH:mm')
  }
}

formatter(new Date('2024-07-09'))

// object {}
const activity = {
  name: "Almoço",
  date: new Date("2024-07-09 22:00"),
  finished: true
}

let activities = [
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

// activities = []

// arrow function
const createActivityItem = (activity) => {
  let input = `<input type="checkbox" onchange="finishActivity(event)" value="${activity.date}"`

  if(activity.finished) {
    input += 'checked'
  }

  input += '>'

  const format = formatter(activity.date)

  return `
  <div>
    ${input}
    <span>${activity.name}</span>
    <time>
      ${format.day.week.long}, dia ${format.day.numeric} 
      de ${format.month}
      às ${format.hour}h
    </time>
  </div>
  `
}

const updateActivitiesList = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''
  
  if(activities.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  for(let activity of activities) {
    section.innerHTML += createActivityItem(activity)
  }
}

updateActivitiesList()

const saveActivity = (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const name = formData.get("activity")
  const day = formData.get("day")
  const hour = formData.get("hour")
  const date = `${day} ${hour}`

  const newActivity = {
    name,
    date,
    finished: false
  }

  const activityExists = activities.find((activity) => {
    return activity.date == newActivity.date
  })

  if(activityExists) {
    return alert("Dia/Hora não disponível")
  }
  
  activities = [newActivity, ...activities]
  updateActivitiesList()
}

const createDaysSelect = () => {
  const days = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03"
  ]

  let selectDays = ""

  for(let day of days) {
    const format = formatter(day)
    const formattedDate = `${format.day.numeric} de ${format.month}`
    
    selectDays += `
    <option value="${day}">${formattedDate}</option>
    `
  }

  document.querySelector('select[name="day"]').innerHTML = selectDays
}

createDaysSelect()

const createHoursSelect = () => {
  let availableHours = ''

  for(let i = 6; i < 23; i++) {
    const hour = String(i).padStart(2, '0')
    availableHours += `<option value="${hour}:00">${hour}:00</option>`
    availableHours += `<option value="${hour}:30">${hour}:30</option>`
  }

  document.querySelector('select[name="hour"]').innerHTML = availableHours
}

createHoursSelect()

const finishActivity = (event) => {
  const input = event.target
  const currentInputDate = input.value

  const activity = activities.find((activity) => {
    return activity.date == currentInputDate
  })

  if(!activity) {
    return
  }

  activity.finished = !activity.finished
}