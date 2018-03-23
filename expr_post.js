const Joi =require('joi');
var express=require('express');
var app=express();
app.use(express.json());//adding piece of middleware

    const courses=[
        {id:1,name:'courses1'},
        {id:2,name:'courses2'}
    ];
        
        app.post('/api/courses',(req,res)=>{

            // if(!req.body.name||req.body.name.length<3)
            // {
            //     res.status(400).send('name required minimum of 3 characters')
            //     return;
            // }
            //using scema validation
            // const schema={
            //     name:Joi.string().min(3).required()
            // };
            // const result=Joi.validate(req.body,schema);
            // if(result.error){
            //     res.status(400).send(result.error.details[0].message);
            //     return;
            // }
            const {error}=validateCourse(req.body);
                if(error){
                    res.status(400).send(error.details[0].message);
                    return;
                }

                const course={
                 
                   id:courses.length+1, //to take hardcoded values from courses array
                    name:req.body.name
                };
                    courses.push(course);
                    res.send(course);
        });
       
            function validateCourse(course){
                const schema={
                    name:Joi.string().min(3).required()
                };
                return Joi.validate(course,schema);
            }
        app.get('/api/courses',(req,res)=>{
            res.send(courses);
        });

        const port=process.env.PORT || 3000;
        app.listen(port,()=>{
        console.log(`listning port ${port}`)
        });

        // code for put
        // app.put('/api/courses/:id',(req,res)=>{
        //     //step:1 look up the course if not exist return errr 404
        //     const course=courses.find(c=>c.id===parseInt(req.params.id))
        //     if(!course)res.status(404).send("the course with given id is not found");
        //            // res.send(course);
           
            
        //     //step:2 validate, if invalid,re 400 -bad request
        //         //const result=validateCourse(req.body);
        //         const {error}=validateCourse(req.body);
        //         //const {error} is object destructor with error property,its equivalent to result.error
    
        //     if(error){
        //         res.status(400).send(error.details[0].message);
        //         return;
        //     }
    
        //     //step3: update course,and return the updated course
        //     course.name=req.body.name;
        //     res.send(course);
        // });