// variables
let canvas
let cityGround, cityRoad, cityBuildings
let population = 30
let persons = []
let populationLabel
let employedPersonCount = 0, unemployedPersonCount = population, teacherCount = 0, policeCount = 0, engineerCount = 0, actressCount = 0, nurseCount = 0 
let employmentCount = [employedPersonCount, unemployedPersonCount]

let homeLocations = [[625, 30], [700, 30], [700, 100],
                    [510, 240], [580, 280], [720, 250], 
                    [700, 320], [720, 400], [720, 450],
                    [500, 515], [500, 580], [580, 580]]

let destinationLocations = [[230, 90], [60, 100], [80, 335],
                            [50, 535], [270, 555], [95, 645],
                            [290, 720], [225, 715]]

let jobs = ['teacher', 'engineer', 'police', 'nurse', 'actress']

// controls
let populationSlider, simulateBtn, stopBtn, resetBtn

// charts
let ctxemploymentStatusChart = document.getElementById('employmentStatusChart').getContext('2d');
let employmentStatusChart = new Chart(ctxemploymentStatusChart, {
    type: 'doughnut',
    data: {
        labels: ['Employed', 'Unemployed'],
        datasets: [{
            label: 'Employment Status',
            data: [employedPersonCount, unemployedPersonCount],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        aspectRatio: 1,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let ctxtypeOfEmploymentChart = document.getElementById('typeOfEmploymentChart').getContext('2d');
let typeOfEmploymentChart = new Chart(ctxtypeOfEmploymentChart, {
    type: 'bar',
    data: {
        labels: ['Teacher', 'Engineer', 'Police', 'Nurse', 'Actress'],
        datasets: [{
            label: 'Type of Job',
            data: [teacherCount, engineerCount, policeCount, nurseCount, actressCount],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function preload()
{
    cityGround = loadImage('https://i.postimg.cc/1574sx4f/city-Ground.png')
    cityRoad = loadImage('https://i.postimg.cc/Zq4qLJMs/cityRoad.png')
    cityBuildings = loadImage('https://i.postimg.cc/vBPCcwjN/city-Buildings.png')
}

function setup()
{
    canvas = createCanvas(750, 750)
    canvas.parent('canvas-container')
    
    populationSlider = createSlider(0, 100, 30, 1)
    populationSlider.parent('population-slider')

    simulateBtn = createButton('Simulate')
    simulateBtn.parent('simulate-btn')
    simulateBtn.mousePressed(generatePersons)

    stopBtn = createButton('Reset')
    stopBtn.parent('stop-btn')
    stopBtn.mousePressed(stopPersons)

    populationLabel = document.getElementById('populationCount')
}

function generatePersons()
{
    for (let i = 0; i < population; i++)
    {        
        persons.push(new Person())
    }
}

function stopPersons()
{
    persons = []
    unemployedPersonCount = population
    employedPersonCount = 0
    teacherCount = 0
    policeCount = 0
    engineerCount = 0
    actressCount = 0
    nurseCount = 0 
}

function clearCity()
{
    image(cityGround, 0, 0)
    image(cityRoad, 0, 0)
}

function draw()
{
    clearCity()
    for (let i = 0; i < persons.length; i++)
    {
        persons[i].show()
        if(persons[i].isAtHome)
        {
            persons[i].moveToDestination()

            if(persons[i].x == persons[i].destination.x && persons[i].y == persons[i].destination.y)
            {
                let isOldStatusEmployed = persons[i].isEmployed
                // nana siya sa destination
                // check if hireable 
                if (((persons[i].skillset == 'teacher' || persons[i].skillset == 'actress' || persons[i].skillset == 'nurse') && persons[i].totalAtt >= 12) || (persons[i].skillset == 'police' && persons[i].totalAtt >= 14) || (persons[i].skillset == 'engineer' && persons[i].totalAtt >= 13))
                {
                    persons[i].isEmployed = true                    
                }

                if(persons[i].isEmployed == true && isOldStatusEmployed == false)
                {
                    employedPersonCount += 1
                    unemployedPersonCount = population - employedPersonCount
                    if (persons[i].skillset == 'teacher')
                    {
                        teacherCount += 1
                    } 
                    else if (persons[i].skillset == 'police')
                    {
                        policeCount += 1
                    }
                    else if (persons[i].skillset == 'nurse')
                    {
                        nurseCount += 1
                    }
                    else if (persons[i].skillset == 'engineer')
                    {
                        engineerCount += 1
                    }
                    else if (persons[i].skillset == 'actress')
                    {
                        actressCount += 1
                    }
                }
                persons[i].isAtHome = false
            }
            
        }
        else
        {
            persons[i].moveToHome()
            persons[i].isAtHome = (persons[i].x == persons[i].home.x && persons[i].y == persons[i].home.y)

        }
    }

    populationLabel.innerHTML = populationSlider.value()
    if (persons.length == 0)
    {
        population = populationSlider.value()
    } 

    employmentStatusChart.data.datasets[0].data[0] = employedPersonCount
    employmentStatusChart.data.datasets[0].data[1] = unemployedPersonCount
    employmentStatusChart.update()

    typeOfEmploymentChart.data.datasets[0].data[0] = teacherCount
    typeOfEmploymentChart.data.datasets[0].data[1] = engineerCount
    typeOfEmploymentChart.data.datasets[0].data[2] = policeCount
    typeOfEmploymentChart.data.datasets[0].data[3] = nurseCount
    typeOfEmploymentChart.data.datasets[0].data[4] = actressCount
    typeOfEmploymentChart.update()

    image(cityBuildings, 0, 0)
}

class Person
{
    constructor()
    {
        // generating random starting location
        let randomHome = random(homeLocations)
        this.home = createVector(randomHome[0], randomHome[1])

        this.x = randomHome[0]
        this.y = randomHome[1]
        this.speed = 1
        this.isEmployed = false
        this.isAtHome = true

        // generating random attributes
        let randomGwa = random(1, 6), randomLogic = random(1, 6), randomCreativity = random(1, 6), randomPhysicalBuild = random(1, 6), randomPerseverance = random(1, 6)

        // assign generated values to the corresponding attributes
        this.gwa = randomGwa
        this.logic = randomLogic
        this.creativity = randomCreativity
        this.physicalBuild = randomPhysicalBuild
        this.perseverance = randomPerseverance
        this.totalAtt = randomGwa + randomLogic + randomCreativity + randomPhysicalBuild + randomPerseverance

        // setting skillset base on the attributes
        let identifiedSkillSet = this.identifySkillSet(randomGwa, randomLogic, randomCreativity, randomPhysicalBuild, randomPerseverance)
        this.skillset = identifiedSkillSet

        // destination will depend on the skillset of the person
        let identifiedDestination = this.identifyDestination(identifiedSkillSet)
        this.destination = identifiedDestination
    }

    identifySkillSet(gwa, logic, creativity, physicalBuild, perseverance)
    {
        let totalAtt = gwa + logic + creativity + physicalBuild + perseverance
        
        // let jobs = ['teacher', 'engineer', 'police', 'nurse', 'actress']

        if (totalAtt >= 14 && gwa >= 4 && logic >= 4 && perseverance >= 4)
        {
            return jobs[1]
        }
        if (totalAtt >= 13 && gwa >= 3  && perseverance >= 4)
        {
            return jobs[3]
        }
        if (totalAtt >= 12 && physicalBuild >= 4)
        {
            return jobs[2]
        }
        if (totalAtt >= 11)
        {
            if (creativity >= 4)
            {
                return jobs[4]
            }
            return jobs[0]
        }

        return random(jobs)
    }

    identifyDestination(skillset)
    {
        if (skillset == 'teacher')
        {
            return createVector(230, 90)
        }
        else if (skillset == 'nurse')
        {
            return createVector(270, 555)
        }
        else if (skillset == 'engineer')
        {
            let randomLocation = random([[60, 100], [80, 335]])
            return createVector(randomLocation[0], randomLocation[1])
        }
        else if (skillset == 'police')
        {
            let randomLocation = random([[50, 535], [95, 645]])
            return createVector(randomLocation[0], randomLocation[1])
        }
        else if (skillset == 'actress')
        {
            let randomLocation = random([[290, 720], [225, 715]])
            return createVector(randomLocation[0], randomLocation[1])
        }
    }

    show()
    {
        if (this.isEmployed)
        {
            fill('#FF6C6C')
            noStroke()
            circle(this.x, this.y, 8)
            return
        }
        fill('#6EBACC')
        noStroke()
        circle(this.x, this.y, 8)
    }

    moveToDestination()
    {
        if(this.destination.x > this.x)
            this.x += this.speed
        if (this.destination.x < this.x)
            this.x -= this.speed
        if(this.destination.y > this.y)
            this.y += this.speed
        if (this.destination.y < this.y)
            this.y -= this.speed
    }

    moveToHome()
    {
        if(this.home.x > this.x)
            this.x += this.speed
        if (this.home.x < this.x)
            this.x -= this.speed
        if(this.home.y > this.y)
            this.y += this.speed
        if (this.home.y < this.y)
            this.y -= this.speed
    }
}

