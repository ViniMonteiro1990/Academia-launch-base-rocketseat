const fs = require('fs')
const data = require('../data.json')
const Intl = require('Intl')
const { age, date } = require ('../utilis')

exports.index = function(req,res){

    return res.render("instructors/index", { instructors: data.instructors})
}
//show--mostra para o usuario
exports.show = function(req,res){
    //req.query.id
    //req.body
    //req.params.id = /:id
    const {id} = req.params
    //para encontrar o instrutor da vez
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })
    if(!foundInstructor) return res.send("Instructor not found")

        
    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),       
        services: foundInstructor.services.split(","),//com o split ele separa oq estiver por virgulas
        created_at:new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),//serve para pegar a data em q o instrutor foi inscrito com data pt br
    }
    
    return res.render('instructors/show',{instructor})
}
exports.create = function(req,res){
    return res.render('instructors/create')
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

    //desestruturação no JS colocar tudo separado em uma variavel, oq eu estou enviando para o data.json
    let {avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number (data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })
    /*
    req.body.birth = Date.parse(req.body.birth)
    //ele vai pegar a data colocada na pagina e criar no data.json um created_at com um número q se baseia em cima de 01/01/1970

    req.body.created_at = Date.now()
    //[] array vazio qdo rodar o push
    data.instructors.push(req.body)// ele vai transformar o array em objeto[{...} e toda vez q adicionar algum elemento ele faz outro [{...},[{...}]

    //para q se tenha apenas um por vez pegando o ID,ele pega o array do data instructors e adiciona mais 1 sempre,para garantir q esse ID sera um NUMERO e por isso NUMBER
    req.body.id = Number (data.instructors.length + 1)*/

    //ele vai pegar o arquivo do site e colocar dentro do data,coloca null pq n qr pegar nd ali e o NUMERO 2 é para formatação do data.json para quebrar a linha
    fs.writeFile("data.json", JSON.stringify(data,null,2),function(err){

        if (err) return res.send('Write file error!')

        return res.redirect('/instructors')
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
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })
    if(!foundInstructor) return res.send("Instructor not found")


    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }
    /*console.log(instructor)*/
    return res.render('instructors/edit',{ instructor })
}
//put salvar no backend

exports.put = function(req,res){
    const {id} = req.body
    //para encontrar o instrutor da vez pelo body
    //para procurar instrutor cadastrado
    
    let index = 0
    const foundInstructor = data.instructors.find(function(instructor,foundIndex){
        if(id == instructor.id){
            index = foundIndex
            return true
        }
    })
    if(!foundInstructor) return res.send("Instructor not found")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)//transforma uma string em um numero no data.json
    }
    //buscar a posição do index
    data.instructors[index] = instructor

    fs.writeFile("data,json",JSON.stringify(data,null,2),function(err){
        if(err) return res.send ("Write error")

        return res.redirect(`/instructors/${id}`)

    })
}

//delete

exports.delete = function(req,res){
    const { id } = req.body

    //para cada instrutor ele filtra dos instrutores,para verificar se eh diferente do ID q estou excluindo

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){

        if(err) return res.send ("write error")

        return res.redirect("/instructors")

    })
}