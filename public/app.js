const API_URL = 'http://localhost:5000/api/students/';

let studentsArray = [];
const container = document.getElementById('studentsContainer');

let html = '';

async function createUI(arr) {
  arr.map((students) => {
      students.thumbnail = './rob12.png';

    html += `
    <ul class="grid">
    <li>
    <img src='${students.thumbnail}'>
    <h3>${students.name}</h3>
    <h3>${students.email}</h3>
    <h3>${students.adress}</h3>
    </li>
  </ul>
  `;
  });

  container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', () => {
  async function fetchStudents() {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.students;
  }

  fetchStudents().then((students) => {
    createUI(students);
  });

  /* fetchStudents().then((students) => {
    let list = '<ul class="grid">';
    for (let i = 0; i < students.length; i++) {
      console.log(students[i]);
      list += '<li>';
      list += '<img src=' + students[i].thumbnail + '">';
      list += '<h3>' + students[i].name + '</h3>';
      list += '</li>';
    }
    list += '</ul>';
    document.getElementById('studentContainer').textContent = list;
  }); */
});
