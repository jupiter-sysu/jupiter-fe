import { SERVER } from '../app-config/nework';

function myFetch(url, method, data) {
  const fullUrl = SERVER + url; 
  const data_string = JSON.stringify(data);
  return new Promise((resolve, reject) => {
      if (method === 'GET') {
          fetch(fullUrl, {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          })
              .then(res => res.json())
              .then((res) => { resolve({ res }) })
              .catch((err) => {
                  console.log(err);
              });
      } else if (method === 'POST') {
        //   fetch(fullUrl, {
        //       method: 'POST',
        //       headers: {
        //           'Accept': 'application/json',
        //           'Content-Type': 'application/json',
        //           'body': JSON.stringify(data),
        //       },
        //   })
        //       .then(res => res.json())
        //       .then((res) => { resolve(res) })
        //       .catch((err) => {
        //           console.log(err);
        //       });

          fetch(fullUrl, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: data_string
          })
              .then(res => res.json())
              .then((res) => { resolve(res) })
              .catch((err) => {
                  console.log(err);
              });
      }
  });
}


export default myFetch;
