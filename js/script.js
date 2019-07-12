const listOfStudents = document.querySelectorAll('.student-item');
const studentsPerPage = 10;

/*
    This function hides all the students except for the ten(maximum) that will be displayed on a given page.
    @param1 {array}
    @param2 {integer}
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
    This function creates and appends functioning pagination links.
    @param {array}
*/
const appendPageLinks = (list) => {
   const mainDiv = document.querySelector('.page');
   const old = document.querySelector('.pagination');
      if (old != null) { // Removes the old pagination links so it will not build up everytime the user inputs something on the search field.
         mainDiv.removeChild(old);
      };
   const pageDiv = document.createElement('div');
   const pageUL = document.createElement('ul');
   pageDiv.className = 'pagination';
   mainDiv.appendChild(pageDiv);
   pageDiv.appendChild(pageUL);

   const pages = Math.ceil(list.length/studentsPerPage); // Returns the no. of pages needed to paginate.
   for ( let i = 1; i <= pages; i++){ // Loops over the no. of pages needed to paginate.
      const pageLI = document.createElement('li'); //Creates 'li' elements needed to contain the ten students per given page.
      const pageA = document.createElement('a'); // Creates 'a' elements used for pagination links.
      pageA.href = '#';
      pageA.textContent = i; //Sets the numbering of each page.
      if (i === 1){
         pageA.className = 'active'; //The class name 'active' sets the css design of the 'a' element when it's hovered and clicked.
      }
      pageUL.appendChild(pageLI);
      pageLI.appendChild(pageA);  
   };

   const a = document.querySelectorAll('.pagination ul li a');
   //This loop is used in adding event listener to each 'a' element.
   for (let i = 0; i < a.length; i++){
      a[i].addEventListener('click', (e) => {
         for(let j = 0; j < a.length; j++){ // This loop removes 'active' class name in all page links.
            a[j].classList.remove('active');
         };
         e.target.classList.add('active'); // Adds the 'active' class name only to the clicked page link.
         showPage(listOfStudents, e.target.textContent); //Calling this function will show the students list of the clicked page.
      });
   };
};

/*
   This function creates and appends elements used to create a search field.
   When users click the 'Search button', all the list will be filtered according to what the users typed in.
   If the results are more than 10 people, it will be paginated accordingly.
   In addition to clicking the 'Search Button', a 'keyup' eventlistener is added to the search input so that the list filters in real time as the user types.
*/
const studentSearch = () => {
   const headerDiv = document.querySelector('.page-header');
   let searchDiv = document.createElement('div');
   searchDiv.className = 'student-search';
   const searchField = document.createElement('input');
   searchField.setAttribute('placeholder','Search for students...');
   const searchButton = document.createElement('button'); 
   searchButton.textContent = 'Search';
   headerDiv.appendChild(searchDiv);
   searchDiv.appendChild(searchField);
   searchDiv.appendChild(searchButton);

   searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const userInput = searchField.value;
      const searchResults = userSearch(userInput, listOfStudents);
      showPage(searchResults, 1);
      appendPageLinks(searchResults);
   });

   searchField.addEventListener('keyup', (e) => {
      const searchResults =  userSearch(e.target.value, listOfStudents);
      showPage(searchResults, 1);
      appendPageLinks(searchResults);
   });
};

/*
   This function returns an array of the search results.
   @param1 {string}
   @param2 {array}
   Calling this function will display the results of the user search.
*/
const userSearch = (input, list) => {
   let tempArray = []; //This empty array will contain the search results.
   if (!input) { // This returns the paginated list of students when the input field is emptied.
      return list;
   } else {
      for (let i = 0; i < list.length; i++) { // This loops through all the student list.
         list[i].style.display = 'none';
         //Calls the h3 element which contains the names of the students which is inside each list.
         let studentName = list[i].querySelector('h3').textContent.toLowerCase();
         //If student's name includes a value of the user's input, the list will be pushed to the empty array.
         if (studentName.includes(input.toLowerCase())){
               tempArray.push(list[i]);
         }
      };
      return tempArray;
   };
};

studentSearch();
showPage(listOfStudents, 1);
appendPageLinks(listOfStudents);