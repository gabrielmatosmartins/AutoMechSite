export function FuncionarioValidado(){

    function validarFuncionario(){
        let tipo = localStorage.getItem("tipo")
        let id = localStorage.getItem("id")

        if(id === null || id === undefined){
            alert("Você precisa estar logado para usar essa função")
            window.location.href = "/login"
            return
        }

        if(tipo != 1){ 
            alert("Somente funcionarios de oficinas cadastradas podem acessar essa tela")
            window.location.href = `/alterarCadastro/${id}`
        }
    }

    return(
        <>
            {
                validarFuncionario()
            }
        </>
    )
}