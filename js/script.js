/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

document.addEventListener('DOMContentLoaded', () => {
/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
var studentsList = document.querySelectorAll('.student-item');
var studentsPerPage = 10;



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
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

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   const mainDiv = document.querySelector('.page');
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   div.className = 'pagination';
   mainDiv.appendChild(div);
   div.appendChild(ul);

   const pages = Math.ceil(list.length/studentsPerPage);
   for(let i = 0; i < pages; i++ ){
      const li = document.createElement('li');
      const anchor = document.createElement('a');
      if(i === 0){
         anchor.className = 'active';
      }
      anchor.href = '#';
      anchor.textContent = i + 1;
      ul.appendChild(li);
      li.appendChild(anchor);
   }

   const a = document.querySelectorAll('.pagination ul li a')
   for (let i = 0; i < a.length; i++){
      a[i].addEventListener('click', (e) => {
         for(let j = 0; j < a.length; j++){
            a[j].classList.remove('active');
            e.target.classList.add('active');
            showPage(studentsList, e.target.textContent);
         }
      })
   }
   
};
showPage(studentsList, 1);
appendPageLinks(studentsList);



// Remember to delete the comments that came with this file, and replace them with your own code comments.
});