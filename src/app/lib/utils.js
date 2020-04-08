module.exports = {
    age(timestamp){
   
        const today = new Date()
        const birthDate = new Date(timestamp)    
        //2019 - 1984 = 35    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()  
           
        if(month < 0 || 
           month == 0 &&
           today.getDate() <= birthDate.getDate()){
            age = age - 1
        }
        return age    
    },
    
    date(timestamp){
        const date = new Date(timestamp)
        //EM TODOS ELES COLOCAR UTC NA FRENTE PRA PEGAR A DATA UNIVERSAL E NAO A DATA LOCAL
        //ano 
        const year = date.getUTCFullYear()

        //mes cm vai de 0 a 11 adiciono mais 1 para retornar um numero
        const month =`0${date.getUTCMonth() + 1}`.slice(-2)

        //data de 1 a 31
        const day = `0${date.getUTCDate()}`.slice(-2)
       
        /*console.log(`${year}-${month}-${day}`)*/

        
        return {
            day,
            month,
            year,
            iso:`${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
            
    }
}