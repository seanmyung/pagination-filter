
var defaultNumber = 0;
var listPerPage = 10;
var $studentNumber = $('li').length;  //calculate how many students there are
var studentPage = Math.ceil($studentNumber/listPerPage);  //calculate the number of pages needed

//hide all but the first 10 students
var $studentList = $('.student-list li')
$studentList.hide().slice(defaultNumber, listPerPage).show();

//Add input and search button
$('.page-header').append('<div class="student-search"></div>');
var $inputBox = $('<input class="searchName" type="text"><button>Search</button></input>');
$('.page-header .student-search').append($inputBox);

//Store student name to Array
var studentNameArr = [];
for(var i = 0; i < $studentNumber; i++) {
  var $studentName = $('.student-list h3').slice(i, i+1).text();
  studentNameArr.push($studentName);
}

//When click the search button,
$('button').on('click', function (){
//if match names to input, show matched results
  var $inputName = $('.searchName').val();  // get input text
  if(studentNameArr.toString().includes($inputName)) {  //check the input name whether included in Student Array
    if($inputName == '') {
      $studentList.hide().slice(defaultNumber, listPerPage).show(); //If input blank and click, return to the first page
    } else {
      duplicateList(); //else, show student name that was searched
    }
  } else {
    alert("There's no matches!");
  }

});

// Store the index value searched to matchList Array and show those student list
function duplicateList() {
  var matchListArr = [];
  for(var i = 0; i < studentNameArr.length; i++){
    if(studentNameArr[i].includes($('.searchName').val())) {
        matchListArr.push(i);
    }
  }
    $studentList.hide();
    for(var i = 0; i <= matchListArr.length; i ++) {
      $studentList.slice(matchListArr[i], matchListArr[i]+1).show();
    }
}

//make appropriate number of links to the bottonm of the page
var $pagination = $('<div class="pagination"></div>');
$('.student-list').append($pagination);

var $ul = $('<ul></ul>')
$pagination.append($ul);

var $list = $('<li></li>');
$ul.append($list);

//give page numbers each anchor.
for(var num = 1; num <= studentPage; num++) {
  var $anchor = $('<a>'+ num + '</a>');
  $list.append($anchor);
}

//when click page number, show 10 student list each page
$('.pagination a').click(function() {
  var anchorNumber = parseInt(($(this).text()));
  var endList = listPerPage * anchorNumber;
  $studentList.hide().slice(endList-listPerPage, endList).show();
  });
