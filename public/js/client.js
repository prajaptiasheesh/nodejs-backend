let client = new WebSocket('ws://localhost:8080');


client.onmessage = function (event) {

            console.log( JSON.parse( event.data));
}

client.addEventListener('custome_event',(custome_data)=>{

    console.log("custome_data===>>", custome_data);
    
})
client.onopen = ()=>{

   console.log('Opening a connection...');

   if(client.readyState === 1){

      send()
   }
   
}

function send () {
   
  
    var message = {
      type: 'message',
      data: { name: 'ashu', age:23 }
    }
  
  
    client.send(JSON.stringify(message))

    client.send()
  }
  
  // send()