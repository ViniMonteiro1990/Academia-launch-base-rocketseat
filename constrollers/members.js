const fs = require('fs')
const data = require('../data.json')
const Intl = require('Intl')
const { date } = require ('../utilis')

exports.index = function(req,res){

    return res.render("members/index", { members: data.members})
}
//show--mostra para o usuario
exports.show = function(req,res){
    //req.query.id
    //req.body
    //req.params.id = /:id
    const {id} = req.params
    //para encontrar o instrutor da vez
    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    if(!foundMember) return res.send("Member not found")

        
    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay  
   
    }
    
    return res.render('members/show',{member})
}

exports.create = function(req,res){
    return res.render('members/create')
}

//create um usuario-cadastra
exports.post = function(req,res){
    //saber se todos os dados estão preenchidos ou não--Object é um constructor-uma funcao que cria um objeto
    const keys = Object.keys(req.body)

    for(key of keys) {

        //req.body.key == "" isso faz q se verifique se em algum dos campos estiver vazio ele envie a msgs
        if(req.body[key] == ""){
            return res.send('Please,fill all fildes')
        }
    }
    

    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastMember = data.members[data.members.length - 1]
    {
        if(lastMember){
            id = lastMember.id + 1
        }
    }
    

    data.members.push({
        id,
        ...req.body,        
        birth
    })
    /*
    req.body.birth = Date.parse(req.body.birth)
    //ele vai pegar a data colocada na pagina e criar no data.json um created_at com um número q se baseia em cima de 01/01/1970

    req.body.created_at = Date.now()
    //[] array vazio qdo rodar o push
    data.members.push(req.body)// ele vai transformar o array em objeto[{...} e toda vez q adicionar algum elemento ele faz outro [{...},[{...}]

    //para q se tenha apenas um por vez pegando o ID,ele pega o array do data members e adiciona mais 1 sempre,para garantir q esse ID sera um NUMERO e por isso NUMBER
    req.body.id = Number (data.members.length + 1)*/

    //ele vai pegar o arquivo do site e colocar dentro do data,coloca null pq n qr pegar nd ali e o NUMERO 2 é para formatação do data.json para quebrar a linha
    fs.writeFile("data.json", JSON.stringify(data,null,2),function(err){

        if (err) return res.send('Write file error!')

        return res.redirect('/members')
    })

    //return res.send(req.body)
}

//edit um usuario

exports.edit = function(req,res){
    //req.query.id
    //req.body
    //req.params.id = /:id
    const { id } = req.params
    //para encontrar o instrutor da vez
    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    if(!foundMember) return res.send("Member not found")


    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }
    /*console.log(member)*/
    return res.render('members/edit',{ member })
}
//put salvar no backend

exports.put = function(req,res){
    const {id} = req.body
    //para encontrar o instrutor da vez pelo body
    //para procurar instrutor cadastrado
    
    let index = 0
    const foundMember = data.members.find(function(member,foundIndex){
        if(id == member.id){
            index = foundIndex
            return true
        }
    })
    if(!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)//transforma uma string em um numero no data.json
    }
    //buscar a posição do index
    data.members[index] = member

    fs.writeFile("data,json",JSON.stringify(data,null,2),function(err){
        if(err) return res.send ("Write error")

        return res.redirect(`/members/${id}`)

    })
}

//delete

exports.delete = function(req,res){
    const { id } = req.body

    //para cada instrutor ele filtra dos instrutores,para verificar se eh diferente do ID q estou excluindo

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){

        if(err) return res.send ("write error")

        return res.redirect("/members")

    })
}