



const form = document.getElementById('form');
const usersContainer = document.getElementById('usersContainer');
const submitBtn = document.getElementById('submitBtn');

const  themeToggle = document.getElementById('themeToggle');

const tostEl = document.getElementById('mainToast');

const toastMsg = document.getElementById('toastMsg'); 


let users = [];

let editIndex = null;

// changeTheme()



if (localStorage.getItem('users')) {
 
    try{
        users = JSON.parse(localStorage.getItem('users'));

    }catch{
        users = [];

    }

    showData();
}



form.addEventListener("submit", (event) =>{



    event.preventDefault();

const Fd = new FormData(event.target);

const  newUser = {
    email:(Fd.get('email') || '').trim().toLowerCase(),
    age:  String(Fd.get("age") || "").trim(),
    name: (Fd.get('name') || '').trim(),
    phone: (Fd.get('phone') || '').trim(),

}


if(!newUser.email || !newUser.name){
return showToast('Please fill all fields', 'danger');


}


if (editIndex !== null){
    users[editIndex]= newUser;
    editIndex =null
    submitBtn.textContent = "save"
    showToast('User updated successfully', 'success');

}else{
    users.push(newUser);
    showToast('User added successfully', 'success');
}




showData();

form.reset();
localStorage.setItem('users', JSON.stringify(users));


});



// start  function showData()

function  showData(){


    usersContainer.innerHTML= '';

    users.forEach((user,index) =>{
    usersContainer.innerHTML +=`
    <tr>
    <td>${escaoeHtml(user.name)}</td>
    <td>${escaoeHtml(user.email)}</td>
    <td>${escaoeHtml(user.age)}</td>
    <td>${escaoeHtml(user.phone)}</td>
    <td>
        <button class="btn btn-sm btn-primary" onclick="editUser(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">Delete</button>
    </td>
    </tr>
    
    
    `
         
    })
 



}


// start  function deleteuser()

function deleteUser(index){
    users.splice(index,1);

localStorage.setItem('users', JSON.stringify(users));
    showData()
    showToast('User deleted successfully', 'danger');
}




// start function editUser 

function editUser (index){

    const user  = users[index];
form.elements["email"].value = user.email;
form.elements["name"].value = user.name;
form.elements["age"].value = user.age || '';
form.elements["phone"].value = user.phone || '';

editIndex = index;

    submitBtn.textContent = "Update Data"

window.scrollTo({
    top: 0,
    behavior: 'smooth'})
}







// start  toggledark mode



themeToggle.addEventListener('click', ()=>{
const  root  =  document.documentElement;


const  current  =  root.getAttribute('data-bs-theme') || 'light';


const next   =  current === 'dark' ? 'light' : 'dark';

root.setAttribute('data-bs-theme', next);

localStorage.setItem('theme', next);
})






// start  toast
function showToast(message ,  color='success'){

toastMsg.textContent = message;

 const t   =  new bootstrap.Toast(tostEl)

tostEl.classList.remove('text-bg-success','text-bg-danger','text-bg-warning','text-bg-secondary')

tostEl.classList.add(`text-bg-${color}`);
 

t.show()
}




function escaoeHtml(str){
    return String(str)
     .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#039;");
}



