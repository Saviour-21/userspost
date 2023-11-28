export const getCall =  (url) => {
  return new Promise((resolve, reject)=>{
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // return response.json();
      // resolve(response.)
      resolve(response.json());
    })
    .catch(error => {
      reject(error);
    });
  }) 
}
  