//pegar a pagina que está no momento
const currentPage = location.pathname //o caminho q estou
const menuItems = document.querySelectorAll("header .links a")
//mostra no menu qual esta ativado/clicado
for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}
