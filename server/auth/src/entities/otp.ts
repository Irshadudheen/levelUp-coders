export interface Iotp {
    _id?: string,
    email: string,
    otp: string,
    createAt: Date,
    expiresAt: Date
}