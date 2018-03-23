const Joi =require('joi');
var express=require('express');
var app=express();
app.use(express.json());

    const courses=[
        {id:1,name:'courses1'},
        {id:2,name:'courses2'}
    ];
    app.get('/api/courses',(req,res)=>{
        res.send(courses);
    });


    app.put('/api/courses/:id',(req,res)=>{
        //step:1 look up the course if not exist return errr 404
        const course=courses.find(c=>c.id===parseInt(req.params.id))
        if(!course){
                res.status(404).send("the course with given id is not found");
                
    }
        
        //step:2 validate, if invalid,re 400 -bad request
            //const result=validateCourse(req.body);
            const {error}=validateCourse(req.body);
            //const {error} is object destructor with error property,its equivalent to result.error

        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }

        //step3: update course,and return the updated course
        course.name=req.body.name;console.log(course);
        res.send(course);
    });
    function validateCourse(course){
        const schema={
            name:Joi.string().min(3).required()
        };
        return Joi.validate(course,schema);
    }
    app.delete('/api/courses/:id',(req,res)=>{
     
            //step:1 look up the course if not exist return errr 404
            const course=courses.find(c=>c.id===parseInt(req.params.id))
            if(!course){
                    res.status(404).send("the course with given id is not found");
            }
            const index=courses.indexOf(course);
            courses.splice(index,1);
            res.send(course);

    });



const port=process.env.PORT || 3000;
app.listen(port,()=>{
console.log(`listning port ${port}`)
});