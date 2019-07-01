/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

document.addEventListener('DOMContentLoaded', () => {

const listOfStudents = document.querySelectorAll('.student-item'); //list of all students in the array
const studentsPerPage = 10;
/*
   This function will display the max number of students per page and hides the remaining
   @param1 list {array}
   @param2 page {integer}
*/
const showPage = (list,page) => {
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = page * studentsPerPage;  
   for (let i = 0 ; i < list.length; i++){ 
      if(i >= startIndex && i < endIndex){
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
};
/*
   This function creates and appends the elements used for pagination
   @param {array}
*/
const appendPageLinks = (list) => {
   const pages = Math.ceil(list.length/studentsPerPage);
   const mainDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   const ul = document.createElement('ul');
   paginationDiv.className = 'pagination';
   mainDiv.appendChild(paginationDiv);
   paginationDiv.appendChild(ul);
   
   for(let i = 0; i < pages; i++ ){
      const paginationLI = document.createElement('li');
      const aTag = document.createElement('a');
      if(i === 0){
         aTag.className = 'active';
      }
      aTag.href = '#';
      aTag.textContent = i + 1;
      ul.appendChild(paginationLI);
      paginationLI.appendChild(aTag);
   }
   const a = document.querySelectorAll('.pagination ul li a');
   for (let i = 0; i < a.length; i++){
      a[i].addEventListener('click', (e) => {
         for(let j = 0; j < a.length; j++){
            a[j].classList.remove('active');
            e.target.classList.add('active');
            showPage(listOfStudents, e.target.textContent);
         }
      })
   }
};



const studentSearch = () => {
   const h2 = document.querySelector('h2');
   const searchDiv = document.createElement('div');
   const searchButton = document.createElement('button');
   const searchInput = document.createElement('input');
   searchDiv.className = 'student-search';
   searchInput.setAttribute('placeholder','Search for students...');
   searchButton.textContent = 'Search';
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);
   h2.parentNode.insertBefore(searchDiv, h2.nextElementSibling);
  
   searchButton.addEventListener('click', (e) => {
       e.preventDefault();
       const userInput = document.querySelector('.student-search input');
       const searchResults =  userSearch(userInput.value, listOfStudents);
       showPage(searchResults, 1);
       appendPageLinks(searchResults);
   });
  
   searchInput.addEventListener('keyup', (e) => {
       const searchResults =  userSearch(e.target.value, listOfStudents);
       console.log(searchResults);
       showPage(searchResults, 1);
       appendPageLinks(searchResults);
   });
 };
  
  
  
 const userSearch = (input, names) => {
     let tempArray = [];
    if (!input) {
        return names;
    } else {
        for (let i = 0; i < names.length; i++) {
            names[i].style.display = 'none';
            let h3Value = names[i].querySelector('h3').textContent.toLowerCase();
            if (h3Value.includes(input.toLowerCase())){
                tempArray.push(names[i]);
            }
        }
        return tempArray;
    }
 };
  
  
 studentSearch();
 showPage(listOfStudents, 1);
 appendPageLinks(listOfStudents);
  
  
 });