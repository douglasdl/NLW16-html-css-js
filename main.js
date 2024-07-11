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
  <div class="card-bg">
    ${input}
    <div>
      <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>${activity.name}</span>
    </div>
    <time class="short">
      ${format.day.week.short}.${format.day.numeric}<br/> 
      ${format.hour}
    </time>
    <time class="full">
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