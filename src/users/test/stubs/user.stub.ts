import { User } from '../../../schemas/user.schema'

export const userStub = () => {
    return {
        userId: '123',
        name: 'Juan',
        password: 'test',
        email: 'test@example.com',
        favoriteGroups: [],
        nickname: ''
    }    
}