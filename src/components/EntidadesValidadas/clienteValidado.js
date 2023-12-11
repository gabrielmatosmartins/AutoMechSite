export function ClienteValidado(){

    function validarCliente(){
        let tipo = localStorage.getItem("tipo")
        let id = localStorage.getItem("id")

        if(id === null || id === undefined){
            alert("Você precisa estar logado para usar essa função")
            window.location.href = "/login"
            return
        }

        if(tipo != 0){ 
            alert("Somente clientes podem acessar essa tela")
            window.location.href = "/indicadores"
        }
    }

    return(
        <>
            {
                validarCliente()
            }
        </>
    )
}