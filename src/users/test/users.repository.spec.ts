import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestJs/testing'
import { FilterQuery } from 'mongoose'
import { UserModel } from './support/user.model'
import { User } from '../../schemas/user.schema'
import { UsersRepository } from '../users.repository'
import { userStub } from './stubs/user.stub'

describe('UserRepository', ()=> {

    let usersReposotory: UsersRepository;
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [ UsersRepository, {
                provide: getModelToken(User.name),
                useClass: UserModel
            }]
        }).compile();

        usersReposotory = moduleRef.get<UsersRepository>(UsersRepository);
        userModel = moduleRef.get<UserModel>(getModelToken(User.name));

        userFilterQuery = {
            userId: userStub().userId
        } 
        
        jest.clearAllMocks()
    })

    describe('findOne', () => {

        describe('when findOne is called', () => {
            let user: User;

            beforeEach(async () => {
                jest.spyOn(userModel, 'findOne')
                user = await usersReposotory.findOne(userFilterQuery)
            })

            test('then is should call ths userModel', ()=>{
                expect(userModel.findOne).toHaveBeenCalled()
            })
            
        })
    })
})