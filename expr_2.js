var express=require('express');
var app=express();



app.get('/api/expr1',function(req,res){

    res.send("hello world");
});
    app.get('/api/expr2/:id',function(req,res){
        res.send(req.params.id);
    // res.send(JSON.stringify({"name":"amit","add":";wkfnverb"}));
    });
        app.get('/api/calender/:year/:month',function(req,res){
            res.send(req.params);
            // res.send((req.query));also add http://localhost:3000/api/calender/2018/jan?sortBy=name in url after 2018/may
        
        });
            const courses=[
                {id:1,name:'courses1'},
                {id:2,name:'courses2'},
                {id:3,name:'courses1'},
                {id:4,name:'courses2'}
            ];
            //to get all the courses
        app.get('/api/courses',function(req,res){
            res.send(courses);
           
        
        });
       
         
        //to get single course by id
        //here .find is method of array(courses)
        app.get('/api/courses/:id',function(req,res){
         const course=courses.find(c=>c.id===parseInt(req.params.id))
         if(!course)res.status(404).send("the course with given id is not found");
                 res.send(course);
        
    });
            //making dynamic port in cmd command set PORT 5000 or any number which u want
            const port=process.env.PORT || 3000;
                app.listen(port,()=>{
                 console.log(`listning port ${port}`)
            });