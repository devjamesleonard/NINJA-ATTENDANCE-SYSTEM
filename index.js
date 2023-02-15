const express = require('express');
//const { Builder, By, Key, until } = require("selenium-webdriver");
const { collection, addDoc, getDocs } = require("firebase/firestore"); 
//const route = require('route');
const app = express();
const path = require('path')
const { chromium } = require('playwright');
//import { initializeApp } from "firebase/app";

var admin = require("firebase-admin");

var serviceAccount = require("./youngjustice-15e55-firebase-adminsdk-ll3g8-1baa41eedb");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
var ninjaRef = db.collection("ninjas");

const basePath = path.join(__dirname, './public')
const x = {};
const y = {};

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'))
app.get("/",async (req,res)=>{

  res.writeHead(302, {'Location': "http://localhost:5000/"});
  res.end();

});



app.post('/addninja',async (req,res)=>{
  console.log(req.body.id);
 
   //res.render('/');
   
   ninjaRef.doc(req.body.id).set({
    name: req.body.name,
    id: req.body.id,})

   /*

   db.collection("ninjas").add({
    name: req.body.name,
    id: req.body.id,
})
*/

.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
   /*
  try {
    const docRef = await addDoc(collection(db, "ninja"), {
      name: req.body.name,
      id: req.body.id,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  */
  res.writeHead(302, {'Location': "http://localhost:5000/"});
  res.end();
 // axios.get('/'); TRY TO FIX THIS
})


app.post('/post',async (req,res)=>{
   //console.log(req.body.id);
   var docRef = db.collection("ninjas").doc(req.body.id);
   var x = "";
   var errorText = "";
   var scannedin = false;
   await docRef.get().then((doc) => {
    if (doc.exists) {
       // console.log(doc.data().name);
        x = doc.data().name;
        scannedin = true;
        console.log(x + " has arrived!");
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        errorText = "Wrist Band not registered!"
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
const myArray = x.split(" ");

   if(scannedin){
   /*
    (async function example() {
      let driver = await new Builder().forBrowser("chrome").build();
      try {
        await driver.get("https://cn.mystudio.io/attendance/");
        await driver.findElement(By.css('input[placeholder="Email"]')).sendKeys("darren@catosensei.com");
        await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys("]adeGoat99");
        await driver.findElement(By.xpath("//button[normalize-space(text())='Login']")).click();
    
        await driver.findElement(By.xpath("//button[normalize-space(text())='" + myArray[1].charAt(0) + "']")).click();
        
        try {
          await driver.wait(until.elementLocated(By.xpath("//*[normalize-space(text())='" + myArray[0].charAt(0) + myArray[1].charAt(0) + "']")), 2000).click();
        } catch (error) {
        }
        try {
          await driver.wait(until.elementLocated(By.xpath("//button[normalize-space(text())='Check in']")), 2000).click();
        } catch (error) {
        }
        try {
          await driver.wait(until.elementLocated(By.xpath("//div[normalize-space(text())='" + myArray[0].charAt(0) + myArray[1].charAt(0) + "']")), 1000).click();
        } catch (error) {
        }
        try {
          await driver.wait(until.elementLocated(By.xpath("//button[normalize-space(text())='Check in']")), 1000).click();
        } catch (error) {
        }
      } finally {
        await driver.quit();
      }
    })();
*/
    

(async () => {
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    //const document = await page.evaluate('document');


    try {
      await page.goto('https://cn.mystudio.io/attendance/');

      await page.getByPlaceholder('Email').fill('darren@catosensei.com');

      await page.getByPlaceholder('Password').fill(']adeGoat99');

      await page.getByRole('button', { name: 'Login' }).click();
      await page.getByRole('button', { name: myArray[1].charAt(0)+"" }).click();
      await page.getByText(x + ' ' + x).click();
   
     await page.getByRole('button', { name: 'Check in' }).click({ timeout: 1000 });
      await page.getByText(x + ' ' + x).click();
      await page.getByRole('button', { name: 'Check in' }).click({ timeout: 1000 });


    } catch (error) {
    console.log("couldn't find item")
    }
    /*
      try {
       await page.getByRole('button', { name: 'Check in' }).click({ timeout: 1000 });

  await page.click("text=" + x);

await page.getByRole('button', { name: 'Check in' }).click({ timeout: 1000 });
    } catch (error) {
      
    }
     try{
 
    }catch(error){

    }
    */
     

 
  

    await context.close();
    await browser.close();
  })();

}
res.writeHead(302, {'Location': "http://localhost:5000/"});
res.end();

})



const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`))