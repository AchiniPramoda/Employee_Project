import React,{ useState,useEffect } from 'react'




function Bday() {
  const getbd = () => {
    return fetch("http://localhost:8092/api/todaybday", {
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

const [people, setPeople] = useState([]);

    const loadbday = () => {
      getbd().then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setPeople(data);
            }
        })
    };

    useEffect(() => {
      loadbday();
  }, []);

   

  const removePerson = (id) => {
    let newPerson = people.filter((person) => person.id !== id)
    setPeople(newPerson)
  }

  return (
    <div  style={{
      backgroundColor: '#fff',
  
  alignItems: 'center',
  padding: '10px',
  marginTop: '10px',
  borderRadius: '4px',
  textAlign:'center',
  alignContent:'center',

      
    }} className='abc'>



      
      <h3
        style={{
          backgroundColor: '#fff',
          color: '#313174',
          textAlign: 'center',
          fontSize: '36px',
          marginTop: '70px',
          
         
          
        }}
        
      >

        {people.length} birthdays today
      </h3> <br></br>

      {people.map((person) => {
        const { id, name } = person

        return (
          <div className='container' key={id}>
            <div className='avatar'>
            
              <h3 >{name}</h3>
            </div>
            <div style={{
              
                backgroundImage: 'linear-gradient(120deg, #313174, #773f8d)',
                padding:' 5px',
                color: '#fff',
                fontFamily:'inherit',
                border: 'none',
                borderRadius: '4px',
                transition: 'opacity 0.4s',
                cursor: 'pointer',
                
                marginBottom: '70px',
                
              
              
            }} className='button'>
              <button className='btn' onClick={() => removePerson(id)}>
                Dismiss
              </button>
            </div>
          </div>
        )
      })}
     
   </div>
  ) 
}

export default Bday
