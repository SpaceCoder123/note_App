var body = document.querySelector("body");

var main_notes = document.querySelector("#container-notes");
main_notes.style.width = "1000px";
main_notes.style.height = "100%";
main_notes.style.display = "grid";
main_notes.style.gridTemplateColumns = "20% 20% 20%";
main_notes.style.gridAutoRows = "minmax(300px,100px)";
main_notes.style.gridColumnGap = "20%";
main_notes.style.gridRowGap = "30px";

function getValue(){
  var textvalue = document.querySelector("#text_area").value;
  var headvalue= document.querySelector("#text_area_head").value;
  if (headvalue===""){
    alert("Do you want to create a note without heading")
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push({ id: "id " + notesObj.length, text: textvalue,heading: headvalue });
  localStorage.setItem("notes", JSON.stringify(notesObj));
  create_element();
}

function delete_note(val){
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  notesObj.splice(val,1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  create_element();
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function create_element() {
  removeAllChildNodes(main_notes);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let k=0
  notesObj.forEach(element => {
    main_Container = document.createElement("div");
    main_Container.setAttribute("class","card")
    main_heading = document.createElement("h3");
    main_heading.innerText = element.heading;
    main_heading.setAttribute("id", element.id);
    main_heading.setAttribute("class", "notes");
    main_para = document.createElement("p");
    main_para.innerText = element.text;
    main_para.setAttribute("class", "notes");
    delete_button = document.createElement("button");
    delete_button.setAttribute("id", element.id);
    delete_button.setAttribute("onclick", `delete_note('${k}')`);
    k++
    //   styling
    main_Container.style.display = "flex";
    main_Container.style.fontWeight="500px"
    main_Container.style.fontFamily =  "Annie Use Your Telescope, cursive";
    main_Container.style.padding = "20px";
    main_Container.style.flexDirection = "column";
    main_Container.style.width = "200px";
    main_Container.style.background =
      "linear-gradient(rgb(62, 211, 216),rgb(119, 16, 204))";
    main_Container.style.boxShadow = "0px 10px 10px 3px purple";
    main_Container.style.borderRadius = "2px solid red";
    main_Container.style.alignItems = "center";
    delete_button.style.height = "30px";
    delete_button.style.width = "100px";
    delete_button.innerText = "Delete";
    delete_button.style.borderRadius = "10px";
    delete_button.style.marginTop = "30px";
    delete_button.style.cursor = "pointer";
  
    //   adding_value
    main_Container.appendChild(main_heading);
    main_Container.appendChild(main_para);
    main_Container.appendChild(delete_button);
    main_notes.appendChild(main_Container);  
  });
  

}





function search_query(){
  text1=document.querySelector("input").value;
  let inputval=text1.toLowerCase();
  let notecards=document.getElementsByClassName("card");
  Array.from(notecards).forEach(function(element){
    let cardtxt=element.getElementsByTagName("p")[0].innerText;
    if (cardtxt.includes(inputval)){
      element.style.display="flex";
    }
    else{
      element.style.display="none";
    }
    
  });
}

localStorage.clear();