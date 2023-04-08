const fs = require('fs')
const express = require('express')
const server = express()
const path = require ('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/list', (req, res) => {
  fs.readFile('database.json', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const database = JSON.parse(data)
    res.render('list', { database })
  })
})

let names = ['Eugene', 'Charlie', 'David', 'Emily', 'Frank', 'Grace', 'Henry', 'Isabella', 'John', 'Karen', 'Larry', 'Mary', 'Nancy', 'Oliver', 'Patricia', 'Quincy', 'Rachel', 'Sarah', 'Thomas', 'Ursula', 'Victoria', 'William', 'Xander', 'Yvonne', 'Zack']
let countries = ['USA', 'Canada', 'Belarus', 'France', 'Germany', 'Italy', 'Spain', 'UK', 'China', 'Japan', 'Australia', 'Brazil', 'Argentina', 'Chile', 'India', 'Russia', 'South Africa', 'Egypt', 'Nigeria', 'Kenya']

const database = []

for (let i = 0; i < 50; i++) {
  const name = names[getRandom(0, names.length)]
  const age = getRandom(1, 100)
  const country = countries[getRandom(0, countries.length)]
  const user = { name, age, country}
  database.push(user)
}

fs.writeFile('data.json', JSON.stringify(database), err => {
  if (err) {
    console.error(err)
    return
  }
})

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

app.listen(3000, () => console.log("server started"))