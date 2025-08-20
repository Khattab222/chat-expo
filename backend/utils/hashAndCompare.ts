import bcrypt from 'bcryptjs'


export const hashFunction = ({ payload, salt = process.env.SALT_ROUND }: { payload: string; salt?: string } = {payload:""}) => {
    const hashResult = bcrypt.hashSync(payload as string, parseInt(salt as string))
    return hashResult
}


export const compareFunction = ({ payload, hashValue }: { payload: string; hashValue: string }) => {
    const match = bcrypt.compareSync(payload, hashValue)
    return match
}