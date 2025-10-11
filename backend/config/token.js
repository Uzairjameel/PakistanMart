import jwt from 'jsonwebtoken'

export const genToken = (userId)=>{
    try {
        let token =  jwt.sign({userId},process.env.JWT_SECREAT,{expiresIn:'7d'})
        return token
    } catch (error) {
        console.log({error})
    }
}

export const genToken1 = (email)=>{
    try {
        let token =  jwt.sign({email},process.env.JWT_SECREAT,{expiresIn:'7d'})
        return token
    } catch (error) {
        console.log({error})
    }
}
