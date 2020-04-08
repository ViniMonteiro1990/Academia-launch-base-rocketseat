const Intl = require('Intl')
const { age, date } = require ('../../app/lib/utils')


module.exports = {

    index(req,res){

        return res.render("members/index")
    },
    create(req,res){

        return res.render('members/create')
    },
    post(req,res){
    
        const keys = Object.keys(req.body)
    
        for(key of keys) {
    
            //req.body.key == "" isso faz q se verifique se em algum dos campos estiver vazio ele envie a msgs
            if(req.body[key] == ""){
                return res.send('Please,fill all fildes')
            }
        }    
           
            return
    },
    show(req,res){
        return

    },   
    edit(req,res){
        return
    },
    put(req,res){
        
    const keys = Object.keys(req.body)

    for(key of keys) {

        //req.body.key == "" isso faz q se verifique se em algum dos campos estiver vazio ele envie a msgs
        if(req.body[key] == ""){
            return res.send('Please,fill all fildes')
        }
    }
        return
    },
    delete(req,res){

        return
    },
}
