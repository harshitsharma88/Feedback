
window.onload=getAll;

let liId;
let currRating;

for(let i=1;i<=5;i++){
    let node0=document.createTextNode(0);
    document.querySelector(`#u${i}`).appendChild(node0);

}

async function getAll(event){
    event.preventDefault();
    try{
    document.querySelector('#ul2').innerHTML="";
    const response=await axios.get("https://crudcrud.com/api/4d938b5ccf03429baa60ec9e1ae42b02/feedback/");
    response.data.forEach(element => {
        display(element,element._id);
        
    });}
    catch(err){
    console.error(err);
    }
    
}


async function handlesubmit(event){
    event.preventDefault();
    
    const sbbtn=document.querySelector("#btn");

    if(sbbtn.innerText==="Edit Rating"){
        sbbtn.innerText="Submit";
        
        

        const details={
            name: event.target.name.value,
            rating : event.target.rating.value
        }

        let res;

        try{
           res= await axios.put(`https://crudcrud.com/api/4d938b5ccf03429baa60ec9e1ae42b02/feedback/${liId}`,details);
    }
    catch(err){
        console.error(err);
    }

    if(currRating!==details.rating){

    const u=document.querySelector(`#u${currRating}`);
    let no=parseInt(u.lastChild.textContent)-1;
    u.lastChild.textContent=no;

    
    const newu=document.querySelector(`#u${details.rating}`);
    let num=parseInt(newu.lastChild.textContent)+1;
    newu.lastChild.textContent=num;
    }

    const li=document.getElementById(liId)
    li.childNodes[0].textContent=`${details.name} ${details.rating} `;

    const nambox=document.querySelector("#name");
    const slcbox=document.querySelector("#rating");
    nambox.value="";
    slcbox.value=1;

    return;

    }
    
    sbbtn.innerText="Submit";
    
    const details={
        name: event.target.name.value,
        rating : event.target.rating.value
    }
    let res;

    try{
    res= await axios.post("https://crudcrud.com/api/4d938b5ccf03429baa60ec9e1ae42b02/feedback/",details);
    }
    catch(err){
        console.error(err)
    }

    display(res.data,res.data._id);
    
    
    
    const nambox=document.querySelector("#name");
    const slcbox=document.querySelector("#rating");
    nambox.value="";
    slcbox.value=1;

}



function display(details,id){
    const item= document.createElement('li');
    item.setAttribute('id',id);
    item.innerText=`${details.name} ${details.rating} `;

    const dltbtn= document.createElement('button');
    dltbtn.innerText="Delete";
    item.appendChild(dltbtn);

    const edtbtn= document.createElement('button');
    edtbtn.innerText="Edit";
    item.appendChild(edtbtn);

    const ul2=document.querySelector('#ul2');
    ul2.appendChild(item);

    let u= document.querySelector(`#u${details.rating}`);
    let no=parseInt(u.lastChild.textContent)+1;
    u.lastChild.textContent=no;


    dltbtn.addEventListener('click',(event)=>{
        del(event,details,id);
    })

edtbtn.addEventListener('click',(event)=>{
    edit(event,details,id);
})
    

}


async function del(event,details,id){
    event.preventDefault();

    ul2.removeChild(event.target.parentNode);

    try{
        details = await axios.get(`https://crudcrud.com/api/4d938b5ccf03429baa60ec9e1ae42b02/feedback/${id}`)

    }
    catch(err){
        console.log(err);

    }

    const u=document.querySelector(`#u${details.data.rating}`);
    const no=parseInt(u.lastChild.textContent)-1;
    u.lastChild.textContent=no;

    try{
            await axios.delete(`https://crudcrud.com/api/4d938b5ccf03429baa60ec9e1ae42b02/feedback/${id}`);
    }
    catch(err){
        console.error(err);
    }

    
}



async function edit(event,details,id){
    
    let sbbtn=document.querySelector("#btn");
    sbbtn.innerText="Edit Rating"

    const nambox=document.querySelector("#name");
    const slcbox=document.querySelector("#rating");

    console.log(details);


    try{
        details = await axios.get(`https://crudcrud.com/api/4d938b5ccf03429baa60ec9e1ae42b02/feedback/${id}`)

    }
    catch(err){
        console.log(err);

    }

    console.log(details);


    nambox.value=details.data.name;
    slcbox.value=details.data.rating;
    
    liId=details.data._id;
    currRating=details.data.rating;

    


}




