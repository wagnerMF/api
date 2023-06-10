
//const { error } = require('console')
const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService{
   async cadastrar(dto){
        const usuario = await database.usuarios.findOne({
            where: {
            email: dto.email
            }
        })

        if (usuario){
            throw new Error('usuario já cadastrado')
        }        
        
        try {
            const senhaHash = await hash(dto.senha, 8)
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })                
            return novoUsuario
        } catch (error) {
            throw new Error('Error ao cadastrado usuario')            
        }

    }
}


module.exports = UsuarioService