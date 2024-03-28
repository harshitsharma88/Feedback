
for(let i=1;i<=5;i++){
    const node0=document.createTextNode(0);
    node0.innerText=0;
    document.querySelector(`#u${i}`).appendChild(node0);
}

const map= new Map();
for(let i=1;i<=5;i++){
    map.set(i,0);
}


function handlesubmit(event){
    event.preventDefault();
    const sbbtn=document.querySelector("#btn");
    sbbtn.innerText="Submit";
    const details={
        name: event.target.name.value,
        rating : event.target.rating.value
    }
    const u=document.querySelector(`#u${details.rating}`);
    const no=parseInt(details.rating);
    map.set(no,map.get(no)+1);
    u.removeChild(u.lastChild);
    const node=document.createTextNode(map.get(no));
    u.appendChild(node);
    

    axios.post("https://crudcrud.com/api/e771967a96954ead9afcb9ba848c4404/feedback/",details).then((Response)=>{
        display(Response.data,Response.data._id);
        console.log(Response.data._id);
    }).catch((err)=>{
        console.error(err);
    })

    
    
    
    const nambox=document.querySelector("#name");
    const slcbox=document.querySelector("#rating");
    nambox.value="";
    slcbox.value=0;

}

const get=document.querySelector('#get');
get.addEventListener('click',(event)=>{
    event.preventDefault();
    document.querySelector('#ul2').innerHTML="";
    axios.get("https://crudcrud.com/api/e771967a96954ead9afcb9ba848c4404/feedback/").then((response)=>{
        let l=response.data.length;
        for(let i=0;i<l;i++){
            display(response.data[i],response.data[i]._id);
        }
    }).catch((err)=>{
        console.error(err);
    })
})

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

    dltbtn.addEventListener('click',(event)=>{
        event.preventDefault();

        const no=parseInt(details.rating);
        const value =map.get(no);
        if(value>0){
            map.set(no,value-1);
        }
        
        const u=document.querySelector(`#u${no}`);
        u.removeChild(u.lastChild);
        const node=document.createTextNode(map.get(no));
        u.appendChild(node);

        axios.delete(`https://crudcrud.com/api/e771967a96954ead9afcb9ba848c4404/feedback/${id}`).catch((err)=>{
            console.error(err);
        });

        ul2.removeChild(event.target.parentNode)
    })

edtbtn.addEventListener('click',(event)=>{
    event.preventDefault();
    const sbbtn=document.querySelector("#btn");
    sbbtn.innerText="Edit Rating";
    const nambox=document.querySelector("#name");
    const slcbox=document.querySelector("#rating");
    nambox.value=details.name;
    slcbox.value=details.rating;

    const no=parseInt(details.rating);
    const value =map.get(no);
    if(value>0){
        map.set(no,value-1);
    }
        const u=document.querySelector(`#u${no}`);
        u.removeChild(u.lastChild);
        const node=document.createTextNode(map.get(no));
        u.appendChild(node);

        
        axios.delete(`https://crudcrud.com/api/e771967a96954ead9afcb9ba848c4404/feedback/${id}`).catch((err)=>{
            console.error(err);
        });

    ul2.removeChild(event.target.parentNode)
    
    


})
    

}

