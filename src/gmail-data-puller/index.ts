import  path from 'path';
import { google } from 'googleapis';
import fs from 'fs';

const gmail = google.gmail('v1');
const drive = google.drive('v2');
const admin = google.admin('directory_v1');

const ImpersonateEmail = "rimond.allam@allruva.us";
async function runSample() {
  // Obtain user credentials to use for the request
  const auth = new google.auth.JWT({
    keyFile: path.join(__dirname, '../', '../', 'credentials/incetive-5c3ca735c9fb.json'),
    scopes: [ 'https://www.googleapis.com/auth/admin.directory.user', 'https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.modify', 'https://mail.google.com/',],
    subject: ImpersonateEmail
  });
  google.options({auth});
  // await auth.authorize()

  try {
    const res = await gmail.users.messages.list({ userId: ImpersonateEmail });
    
    let allMessages: any = { };
    if(res.data?.messages){
      for(let item of res.data.messages){
        if(item.id){
           let res =  await gmail.users.messages.attachments.get({ id: item.id, userId: ImpersonateEmail })
  
            allMessages[item.id] = res.data.data;
        }
      }
    }
    

    fs.writeFileSync(`./sample-data/${ImpersonateEmail}.json`, JSON.stringify(allMessages));
    console.log("Mails got");

    return res.data;    
  } catch (error) {
      
     console.log('<<<====error====>>>>')
     console.log(error.response.data.error.errors);
  }
  
}

if (module === require.main) {
  runSample().catch(console.error);
}

export default runSample;