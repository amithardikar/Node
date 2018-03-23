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
            const schema={
                name:Joi.string().min(3).required()
            };
            const result=Joi.validate(req.body,schema);
            if(result.error){
                res.status(400).send(result.error.details[0].message);
                return;
            }
           

                const course={
                 
                   id:courses.length+1, //to take hardcoded values from courses array
                    name:req.body.name
                };
                    courses.push(course);
                    res.send(course);
        });
       
            
        app.get('/api/courses',(req,res)=>{
            res.send(courses);
        });

        const port=process.env.PORT || 3000;
        app.listen(port,()=>{
        console.log(`listning port ${port}`)
        });

        