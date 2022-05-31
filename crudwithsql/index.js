
const express = require('express');
const mysql = require('mysql')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// connect db
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'app_test'
});

// get all 
app.get('/',(req,res)=>{
   connection.query("select * from childrenn",(error,data)=>{
        if(!error){
           res.json(data)
          return
        }
        res.status(404).send("xeta")
      })
      
 }
 
)

 // create 
app.post('/',(req,res)=>{
    const {c_birth,c_name}=req.body
    console.log(c_birth,c_name)
    const sql=`insert into childrenn(c_name,c_birth
      )
               values("${c_name}","${c_birth}"),
               ("HASAN","2009-10-08");`;

   connection.query(sql,(error,data)=>{
        if(!error){
            connection.query("SELECT * from childrenn",(error,data)=>{
               if(!error){
                console.log(data)
                console.log("data : ", data);
                res.json(data)
                   return
               }
                 res.send("erorr")
            })
           
         }
         
      }) 
 })

 // delete 

app.delete('/delete/:id',(req, res)=>{
  const id= Number(req.params.id)
  const sql = `delete from children
                where id=${id}` 
  connection.query(sql,(error)=>{
    if(!error){
        connection.query("SELECT * from children",(error,data)=>{
           if(!error){
            console.log(data)
            res.json(data)
               return
           }
             res.send("erorr")
        })
       
     }
  })              
 
}) 

 // show connection
connection.connect((err) => {
    if (!err) { 
      console.log("SUCCESS");
    }
  });

app.listen(5000,(err)=>{
   if(!err){
       console.log("Server Is Running")
   }
})