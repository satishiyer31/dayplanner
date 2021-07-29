
var today = moment();
$("#currentDay").text(today.format("dddd MMM Do, YYYY"));
var currentHour = Number(today.format("HH"));

//constants that let you define the start time and number of work hours.
const startHour = 8;
const workHours = 10;

timeLabel = [];
textDesc =[];
btn =[];

var containerDiv = $(".container");

var rowDiv = $('<div>');
rowDiv.addClass('row');

var colDiv = $('<div>');
//add bootstrap class to colDiv

rowDiv.append(colDiv);
containerDiv.append(rowDiv);

//function to create the UI for the calendar with label, textare & button
function generateCalendar() {

    for (let index = 0; index < workHours; index++) {
        
        timeLabel[index]=  $('<label>');

        if ((startHour + index) == 12) {
            timeLabel[index].text('12 PM');
        }  
         else if  ((startHour+index) > 12) {
            timeLabel[index].text((startHour+index)%12+ ' PM');
         }
         else 
         timeLabel[index].text((startHour+index)%12+' AM');
        
        timeLabel[index].addClass("col-1 hour text-right align-top");
        colDiv.append(timeLabel[index]);

        textDesc[index] = $('<textarea>');
        textDesc[index].addClass("col-10");
        textDesc[index].attr('id',index);
        textDesc[index].attr('data-hour',(startHour+index));
        
        timeLabel[index].attr('for',index);
        
        colDiv.append(textDesc[index]);
        
        btn[index]= $('<button>');
        btn[index].text("Save");
        btn[index].addClass('saveBtn col-1 align-top');
        btn[index].attr('data-hour',(index));
        colDiv.append(btn[index]);

        
    }

}
//function to load events from the local storage into the textboxes
function loadEvents() {
    for (let index = 0; index < workHours; index++) {
        var val = localStorage.getItem(index);
        //console.log (index + val);
        
        if (val !==null ) {
            textDesc[index].text(val);
        }
        
    }
}
//function that compares the currentHour to the various timeblocks and color codes them.
function colorCodeHours() {

    for (let index = 0; index < workHours; index++) {
        // console.log(textDesc[index]);
        var calHour = Number(textDesc[index].attr('data-hour'));
        console.log(calHour); 
        if(currentHour > calHour) {
            textDesc[index].addClass('past');
        } 
        else if (currentHour == calHour)
            textDesc[index].addClass('present');
        else textDesc[index].addClass('future');    
    }
}

generateCalendar();
loadEvents();
colorCodeHours();


//bubble up the button submit to the parent div that pre-exists in the DOM
containerDiv.on('click', function(event){
    //console.log(event.target);
    if (event.target.matches('button')) {
    
        localStorage.setItem(event.target.dataset.hour, textDesc[event.target.dataset.hour].val());
    }
    
})

