export const divideArr = (arr: string[]): [string, string] => {
    const first: string[] = [];
    const second: string[] = [];
    arr.map((elem) => {
        let d = elem.split(' ');
        first.push(d[0])
        second.push(d[1])
    });
    return [first.join(','), second.join(',')];
}

export const recomendationFour = () => {
    return Math.floor(Math.random()*9+4) 
}

export const postLoginResource =async(url:string,emailForm:string,passwordForm:string)=>{
    try{
          const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: emailForm,
                password: passwordForm,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
          if(!res.ok){
              console.error('Could not fetch',res.status);
              return false;
          }
          return await res.json();
      }catch(error:any){
          console.log('Could not fetch',error.message);
          return false;
      }
  }

export const  getMeResource =async(url:string,token:string)=>{
    try{
          const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
          if(!res.ok){
              console.error('Could not fetch',res.status);
              return false;
          }
          return await res.json();
      }catch(error:any){
          console.log('Could not fetch',error.message);
          return false;
      }
  }

  export const postRegistrationResource =async(url:string,name:string,emailForm:string,passwordForm:string)=>{
    try{
          const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                full_name: name,
                email: emailForm,
                password: passwordForm,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
          if(!res.ok){
              console.error('Could not fetch',res.status);
              return false;
          }
          return await res.json();
      }catch(error:any){
          console.log('Could not fetch',error.message);
          return false;
      }
  }

  export const postResetPassword =async(url:string,email:string,token:string,newPassword:string)=>{
    try{
          const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                token: token,
                password: newPassword,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
          if(!res.ok){
              console.error('Could not fetch',res.status);
              return false;
          }
          return await res.json();
      }catch(error:any){
          console.log('Could not fetch',error.message);
          return false;
      }
  }