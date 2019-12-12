# Color Picker
## by: Michael Schneider and Samuel Coleman
[Michael Schneider](https://github.com/mschneider247)<br>
[Samuel Coleman](https://github.com/SamuelColeman)

### Summary:
[live site](https://color-picker-be.herokuapp.com)
Custom built back-end that builds two tables: Projects and Palettes. Palettes are connected to Projects with a foreign key. 10 endpoints allow the user to access and manipulate the database as necessary.

### Installation:
- First fork this repo and clone down your own copy.  
- Once cloned, run npm install and npm start in your terminal. In your browser visit localhost: 3001.  
- Try out the endpoints using a program like Postman

### Tech Stack:
This application utilizes: knex, express, ES6, node.js, cors and TravisCI. Deployed with Heroku.

### Story Board:
[Project](https://github.com/SamuelColeman/color_picker_be/projects/1)

### API Endpoints

<details>

  <summary><code>GET </code>all projects</summary>
  example request : `GET` `/api/v1/projects`
  <br>
  example response: 

  ```javascript
  [
    {
        "id": 14,
        "projectId": 1,
        "name": "BYOB",
        "created_at": "2019-12-05T20:00:47.912Z",
        "updated_at": "2019-12-05T20:00:47.912Z"
    }
  ]
  ```

</details>

---

<details>
  <summary><code>GET </code>all palettes</summary>
  example request : `GET` `/api/v1/palettes`\
  <br>
  example response: 

  ```javascript
[
    {
        "id": 22,
        "projectId": 1,
        "name": "cooler colors",
        "color1": "#668B7B",
        "color2": "#B8CDCD",
        "color3": "#4F4F4F",
        "color4": "#7A9B8B",
        "color5": "#938B9B",
        "created_at": "2019-12-05T20:00:47.915Z",
        "updated_at": "2019-12-05T20:00:47.915Z"
    }
 ]
  ```
</details>

---

<details>
  <summary><code>GET</code> a specific project by appending the project id</summary>
  example request : `GET` `/api/v1/projects/14`
  <br>
  example response: 

  ```javascript
  [
    {
        "id": 14,
        "projectId": 1,
        "name": "BYOB",
        "created_at": "2019-12-05T20:00:47.912Z",
        "updated_at": "2019-12-05T20:00:47.912Z"
    }
  ]
  ```
</details>

---

<details>
  <summary><code>GET</code> a specific palette by appending the palette id</summary>
  example request : `GET` `/api/v1/palettes/22`
  <br>
  example response: 

  ```javascript
[
    {
        "id": 22,
        "projectId": 1,
        "name": "cooler colors",
        "color1": "#668B7B",
        "color2": "#B8CDCD",
        "color3": "#4F4F4F",
        "color4": "#7A9B8B",
        "color5": "#938B9B",
        "created_at": "2019-12-05T20:00:47.915Z",
        "updated_at": "2019-12-05T20:00:47.915Z"
    }
]
  ```
</details>

---

<details>
  <summary><code>POST</code> a new project to the database</summary>
  example request : `POST` `/api/v1/projects`
  <br>
  body.json()

  ```javascript
{
	"projectId": 10,
	"name": "Example Project"
}
  ```

  example response: 

  ```javascript
{
    "id": 16
}
  ```

</details>

---

<details>
  <summary><code>POST</code> a new palette to the database</summary>
  example request : `POST` `/api/v1/palettes`
  <br>
  body.json()

  ```javascript
{
	"projectId": 10,
	"name": "Example Project",
	"color1": "#668B7B",
    "color2": "#B8CDCD",
    "color3": "#4F4F4F",
    "color4": "#7A9B8B",
    "color5": "#938B9B"
}
  ```

  example response: 

  ```javascript
{
    "id": 25
}
  ```

</details>

---

<details>
  <summary><code>PATCH</code> a project name by selecting the id</summary>
  
  example request : `PATCH` `/api/v1/projects/1`
  body.json()

  ```javascript
{
	"name": "Example Project"
}
  ```

  <br>
  example response: 

  ```javascript
{
    "message": "Project renamed!"
}
  ```

</details>

---

<details>
  <summary><code>PATCH</code> a palettes colors by selecting the id</summary>
  
  example request : `PATCH` `/api/v1/palettes/22`
  body.json()

  ```javascript
{
	"color1": "#FFFFFF"
}
  ```

  <br>
  example response: 

  ```javascript
{
    "message": "Palette color reassigned!"
}
  ```

</details>

---

<details>
  <summary><code>DELETE</code> a project by appending its id</summary>
  
  example request : `DELETE` `/api/v1/projects/10`
  <br>
  example response: 

  ```javascript
"Project 10 deleted"
  ```

</details>

---

<details>
  <summary><code>DELETE</code> a palette by appending its id</summary>
  
  example request : `DELETE` `/api/v1/palettes/25`
  <br>
  example response: 

  ```javascript
"Palette 25 deleted"
  ```

</details>
