const businessInputDTO = (name : string, cnpj : string, email : string, address : string, site : string) => {
    return {name: name, cnpj: cnpj, email: email, address: address, site: site}
}

export default businessInputDTO