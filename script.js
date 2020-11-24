

//OOP is faster and easier to execute
//OOP provides a clear structure for the programs
//OOP helps to  "Don't Repeat Yourself", and makes the code easier to maintain, modify and debug
//OP makes it possible to create full reusable applications with less code and shorter development time.

/* Pseudocode

Set item's name , quantity ,expiry date , genre .
 If name and quantity ,expiry date fields are not empty
    If  Genre is not selected
        If quantity is anummber

            Then Add inputs to the List
                Empty all inpute fields
                Reset all error warning
        Else 
            show Quantity error warning (Quantity is not a nummber) 

    Else 
            show Genre error warning (Genre is not a choosed) 
Else 
            Print error warning (Failds are empty) 

If the expiration date has expired 
            show  error warning (the expiration date has expired) 

Push the button to decrease (take item of Fridge)

    If the quantity of the items becomes less than three-pieces
         show  error warning (the quantity is less than three-pieces)
         
    If the quantity is equal to zero
        Remove the item from the list
 */ 


const background=document.body.style;
background.backgroundImage="url('images/fr2flip.jpg')";
background.backgroundRepeat="no-repeat";
background.backgroundSize="cover";
background.backgroundAttachment= "fixed";
background.backgroundPosition="center";

const bookPic = document.querySelector('#blah');
const btnUpload=document.getElementById("btnUpload");
const btnSave=document.getElementById("btnSave");




const inputs=document.querySelectorAll(".input");
for (let index = 0; index < inputs.length; index++) {
    const element = inputs[index];
    element.addEventListener("mouseover",changebgColor);
    element.addEventListener("mouseleave",resetColorTrans);
    
}
function resetColorTrans(e){
    e.target.style.background="transparent";
}

btnSave.addEventListener("mouseover",changebgColor);
btnSave.addEventListener("mouseleave",resetColor);
function resetColor(e){
    e.target.style.background="lightseagreen";
}

function changebgColor2(e){
e.target.parentElement.style.background=" rgb(216, 213, 213)";
}
function changebgColor(e){
e.target.style.background=" rgb(216, 213, 213)";
}




  //OOP
  function Book(Name,Author,Published,Genre){
      this.Name=Name,
      this.Auther=Author,
      this.Published=Published,
      this.Genre=Genre
  }
  const bookList=[];

//OOP Structure
function AddBook(name,auth,pub,gen){
    const book=new Book(name,auth,pub,gen);
    bookList.push(book);

}
//Exemples
AddBook("Cucumber",5,"2020-10-15","Vegetables");
AddBook("Tomato",7,"2020-10-10","Fruits");
AddBook("Carrots",4,"2020-11-03","Fruits");
//*********************** 

//*********************Start validation */
btnSave.addEventListener("click",saveBook);
function emptyAllFuilds(){
  
    document.getElementById("labNameWar").style.display="none";
}
function saveBook(){
    const genreValue=document.getElementById("dropGenre").value;
    if(inputs[0].value!==""&&inputs[1].value!==""&&inputs[2].value!==""){
        
             if(genreValue!=="Choose one"){ 
                    if(!isNaN(inputs[1].value)){ 
                    AddBook(inputs[0].value,inputs[1].value,inputs[2].value,genreValue);
                    inputs.forEach(element => {
                        element.value="";

                    });
                    document.getElementById("dropGenre").value="Choose one";
                    document.getElementById("dropGenre").style.border="1px solid transparent";
                    inputs[1].style.border="none";
                    
                    inputs[1].style.borderRadius="5px";
                    inputs[1].style.borderBottom="2px solid rgb(63, 61, 61)";
                   
                    setInHtml();
                    emptyAllFuilds();
                    addEventList();
                    checkExpiryDate();
                    checkQuatity();
                    
                    
                }else{
                    
                    inputs[1].style.border="1px solid red";
                }
            }
            else{ 
                
                document.getElementById("dropGenre").style.border="1px solid red";
            } 
            
        }else{
            document.getElementById("labNameWar").style.display="block";
        }
    }
    
    //************** End validation*/
    
     
//////////// Start Set table in Html////////////////////////////////////
  
    
    var tableStart = `
    <h1 class="cardDetails">All items in the Fridge</h1>
              
                
      <table>
     
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Expiry date </th>
          <th>Genre</th>
          
        </tr>`;
    var tableEnd = `
        
      </table>`;
    
    function itemTemplate(item) {
      return `
          <tr class="tableTr" id="tableTr">
            <td>${item.Name}</td>
            <td class="Quantity">${item.Auther }</td>
            <td class="ExpiryDate">${item.Published}</td>
            <td>${item.Genre }</td>
            <td><input type="button" id="btnTake" class="btnTake" name="Take" value="Take"></td>
            
          </tr>
      `;
    }
    
    function setInHtml(){

        document.getElementById("bookAllList").innerHTML = `
          ${tableStart}
          ${bookList.map(itemTemplate).join("")}
          ${tableEnd}
        `;
    }
    setInHtml();
    //////////// End Set table in Html////////////////////////////////////


    //******************************* Start Table property */
  
    let allTr=document.querySelectorAll(".tableTr");
    allTr.forEach(element => { 
        element.addEventListener("mouseover",changebgColor2);
        element.addEventListener("mouseout",returnColor);
    });
    function returnColor(e){
        e.target.parentElement.style.background="none";
    }
    
    function addEventList(){
        const allBtnTake=document.querySelectorAll(".btnTake");
        allBtnTake.forEach(btn => {
         btn.addEventListener("click",decreaseNumber);
         
       });
    }
    let tdText=`<td class="star">*</td>`;
    var para = document.createElement("td");                      
    var t = document.createTextNode("This"); 
    para.appendChild(t);     
    addEventList();

  

//******************************* End Table property */
 
//********************************Start decrease Quantity and delete item**/
const newBooklist=bookList;
function decreaseNumber(e){
    const elemName=e.target.parentElement.parentElement.firstChild.nextSibling.textContent;
    for (let index = 0; index < newBooklist.length; index++) {
        const ele = newBooklist[index];
        if(elemName===ele.Name){
            
            ele.Auther--;
            const tdQuantity=e.target.parentElement.parentElement.childNodes[3];
            tdQuantity.textContent=ele.Auther;
            
            if(ele.Auther<3){
                tdQuantity.style.color="red";
            } 
            
            if(ele.Auther===0){
                const inexNum=newBooklist.indexOf(ele);
                newBooklist.splice(inexNum,1);
                if(inexNum===0){
                    newBooklist.splice(1); 
                }
                setInHtml();
                checkExpiryDate();
                checkQuatity();
            }
            addEventList();
        }  
    }
}
//********************************End decrease Quantity and delete item*/


//******************************* Start checking Expiry Date */
    function checkExpiryDate(){
        const currentDate=new Date().toLocaleDateString();
       
       
       const ExpiryDate=document.querySelectorAll(".ExpiryDate");
       ExpiryDate.forEach(date => {   
        if(currentDate>date.textContent){
         date.style.color="red";
        }
      });                   
    }
    checkExpiryDate();
    checkQuatity();
//******************************* End checking Expiry Date */


//******************************* Start checking quantity  */
function checkQuatity(){
    const quantity=document.querySelectorAll(".Quantity");
    quantity.forEach(quan => {
        
        if(quan.textContent<3){
            console.log(quan);
            quan.style.color="red";
        }
    }); 
    
}
//******************************* End checking quantity  */