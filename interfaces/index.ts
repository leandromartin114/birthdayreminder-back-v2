import { JwtPayload } from 'jsonwebtoken'

export interface tokenObject {
    userId: string
}
export interface decodedTokenObject extends JwtPayload {
    userId: string
    iat: number
}
