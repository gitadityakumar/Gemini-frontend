// async function sendUserData() {
//   let randomId = localStorage.getItem('randomId');

//   // Generate and save the random ID if it doesn't exist
//   if (!randomId) {
//     randomId = crypto.randomUUID();
//     localStorage.setItem('randomId', randomId);
//   }

//   const response = await fetch('/api/userdata', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ randomId }),
//   });

//   const result = await response.json();
//   console.log(result.message);
// }
