# EmpSim - Employment Simulation
_An entry for Web Programming contest._

Hello, I'm Marc, a first year student from BSCpE that wants to explore more on websites.

## Concept
I created the concept of this website to be a simulation because of the event description to determine the employment status of graduated students. With this description, I want this website to be dynamic everytime the user runs it. So, I thought of making it a simulation.

## Simulation
The simulation has a City, Person, and Buildings/Areas.
### City
A city is the place where all of the Person (graduated students) generated wanders around to find a job from different sectors of Industrial Buildings/Areas.
### Person
The Person has different attributes or properties used to have variations of skills.
#### Person Properties
- GWA (General Weighted Average)
- Logic Thinking
- Creativity
- Physical Build
- Perseverance
### Buildings/Areas
Buildings/Areas has 2 categories, the Residential and Industrial.
#### Residential
It is the location where random person spawns. This is also where they live.
#### Industrial
This is the area where different sectors are located. Below are the different types of areas and the corresponding jobs:
- School - _Teacher_
- Police Station - _Policeman_
- Hospital - _Nurse/Doctor_
- Offices and Construction Sites - _Engineer_
- Theatre - _Actress_

### Skill Requirements 
Each sectors need a minimum requirements to be able to hire a person:

| Person Property  | Teacher | Police | Actress | Engineer | Nurse |
| ---------------- | ------- | ------ | ------- | -------- | ----- |
| GWA              | 3       | 3      | 1       | 4        | 3     |
| Logical Thinking | 3       | 2      | 1       | 4        | 3     |
| Creativity       | 2       | 1      | 4       | 2        | 2     |
| Physical Build   | 1       | 4      | 3       | 1        | 1     |
| Perseverance     | 3       | 4      | 3       | 3        | 3     | 
