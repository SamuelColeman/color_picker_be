# Color Picker
## by: Michael Schneider and Samuel Coleman
[Michael Schneider](https://github.com/mschneider247)<br>
[Samuel Coleman](https://github.com/SamuelColeman)

### Summary:
[live site]()

### Installation

### Tech Stack:

### API Endpoints

<details>

  <summary><code>GET </code>all projects</summary>
  example request : `GET` `/api/v1/projects`
  <br>
  example response: 

  ```javascript
  
  
  ```

</details>

---

<details>
  <summary><code>GET </code>all palettes</summary>
  example request : `GET` `/api/v1/palettes`\
  <br>
  example response: 

  ```javascript

  ```
</details>

---

<details>
  <summary><code>GET</code> a specific project by appending the project name</summary>
  example request : `GET` `/api/v1/projects/BYOB`
  <br>
  example response: 

  ```javascript

  ```
</details>

---

<details>
  <summary><code>GET</code> a specific palette by appending the palette id</summary>
  example request : `GET` `/api/v1/palettes/2`
  <br>
  example response: 

  ```javascript

  ```
</details>

---

<details>
  <summary><code>POST</code> a new project to the database</summary>
  example request : `POST` `/api/v1/projects`
  <br>
  body.json()

  ```javascript

  ```

  example response: 

  ```javascript

  ```

</details>

---

<details>
  <summary><code>POST</code> a new palette to the database</summary>
  example request : `POST` `/api/v1/palettes`
  <br>
  body.json()

  ```javascript

  ```

  example response: 

  ```javascript

  ```

</details>

---

<details>
  <summary><code>PATCH</code> a project name by selecting the name</summary>
  
  example request : `PATCH` `/api/v1/projects/BYOB`
  body.json()

  ```javascript

  ```

  <br>
  example response: 

  ```javascript

  ```

</details>

---

<details>
  <summary><code>PATCH</code> a palettes colors by selecting the id</summary>
  
  example request : `PATCH` `/api/v1/palettes/2`
  body.json()

  ```javascript

  ```

  <br>
  example response: 

  ```javascript

  ```

</details>

---

<details>
  <summary><code>DELETE</code> a project by appending its name</summary>
  
  example request : `DELETE` `/api/v1/projects/BYOB`
  <br>
  example response: 

  ```javascript

  ```

</details>

---

<details>
  <summary><code>DELETE</code> a palette by appending its id</summary>
  
  example request : `DELETE` `/api/v1/palettes/2`
  <br>
  example response: 

  ```javascript

  ```

</details>
