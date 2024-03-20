// (A) INITIALIZE - DOUBLE CLICK TO EDIT CELL
window.addEventListener("DOMContentLoaded", () => {
    for (let cell of document.querySelectorAll(".editable td")) {
      cell.ondblclick = () => editable.edit(cell);
    }
  });
  
  var editable = {
    // (B) PROPERTIES
    selected : null,  // current selected cell
    value : "", // current selected cell value
  
    // (C) "CONVERT" TO EDITABLE CELL
    edit : cell => {
      // (C1) Remove “double click” to edit cell… Since it is already in “edit mode”."
      cell.ondblclick = "";
  
      // (C2) Set contentEditable on the selected cell and focus on it.
      cell.contentEditable = true;
      cell.focus();
  

      // (C3) Set the “currently editing cell” into editable.selected, 
      // and its current value into editable.value
      cell.classList.add("edit");
      editable.selected = cell;
      editable.value = cell.innerHTML;
  
      // (C4) PRESS ENTER/ESC OR CLICK OUTSIDE TO END EDIT
      window.addEventListener("click", editable.close);
      cell.onkeydown = evt => {
        if (evt.key=="Enter" || evt.key=="Escape") {
          editable.close(evt.key=="Enter" ? true : false);
          return false;
        }
      };
    },
  
    // (D) END "EDIT MODE"
    close : evt => { if (evt.target != editable.selected) {
      // (D1) escape to “cancel edit” - RESTORE PREVIOUS VALUE
      if (evt === false) {
        editable.selected.innerHTML = editable.value;
      }
  
      // (D2) REMOVE "EDITABLE"
      window.getSelection().removeAllRanges();
      editable.selected.contentEditable = false;
  
      // (D3) RESTORE CLICK LISTENERS
      window.removeEventListener("click", editable.close);
      let cell = editable.selected;
      cell.onkeydown = "";
      cell.ondblclick = () => editable.edit(cell);
  
      // (D4) Unselect CURRENT SELECTED CELL
      editable.selected.classList.remove("edit");
      editable.selected = null;
      editable.value = "";
  
      // (D5) DO WHATEVER YOU NEED
      if (evt !== false) {
        console.log(cell.innerHTML);
        // check value?
        // send value to server?
        // update calculations in table?
      }
    }}
  };