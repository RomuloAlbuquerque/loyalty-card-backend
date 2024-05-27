const businessOutputDTO = (id_business: string, name : string, cnpj : string, email : string, address : string, site : string) => {
    return {id_business : id_business, name: name, cnpj: cnpj, email: email, address: address, site: site}
}

export default businessOutputDTO