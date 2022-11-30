import { Test, TestingModuleBuilder } from "@nestjs/testing"
import { User } from "src/schemas/user.schema"
import { CreateUserDto } from "../dto/create-user.dto"
import { UpdateUserDto } from "../dto/update-user.dto"
import { UsersController } from "../users.controller"
import { UsersService } from "../users.service"
import { userStub } from "./stubs/user.stub"

jest.mock('../users.service')

describe('UserController', () => {

    let usersController: UsersController
    let usersService: UsersService


    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile();

        usersController = moduleRef.get<UsersController>(UsersController)
        usersService = moduleRef.get<UsersService>(UsersService)
        jest.clearAllMocks();
    });

    describe('User findOne', () => {
        describe('when findOne is called', () => {
            let user: User;
            beforeEach(async () => {
                user = await usersController.findOne(userStub().userId)
            })

            test('then it should called userService', () => {
                expect(usersService.findOne).toBeCalledWith(userStub().userId)
            })

            test('then it should return a user', () => {
                expect(user).toEqual(userStub())
            })
        })
    })

    describe('findAll', () => {
        describe('when findAll is called', () => {
            let users: User[];
            beforeEach(async () => {
                users = await usersController.findAll()
            })

            test('then it should called userService', () => {
                expect(usersService.findAll).toHaveBeenCalled()
            })

            test('then it should return users', () => {
                expect(users).toEqual([userStub()])
            })
        })
    })

    describe('create', () => {
        describe('when create is called', () => {
            let user: User;
            let createUserDto: CreateUserDto;

            beforeEach(async () => {
                createUserDto = {
                    email: userStub().email,
                    name: userStub().name,
                    nickname: userStub().nickname
                }
                user = await usersController.create(createUserDto)
            })

            test('then it should called userService', () => {
                expect(usersService.create).toHaveBeenCalledWith(createUserDto.name, createUserDto.email, createUserDto.nickname)
            })

            test('then it should return a user', () => {
                expect(user).toEqual(userStub())
            })
        })
    })

    describe('updateUser', () => {
        describe('when updateUser is called', () => {
            let user: User;
            let updateUserDto: UpdateUserDto;

            beforeEach(async () => {
                updateUserDto = {
                    name: 'Test'
                }
                user = await usersController.update(userStub().userId, updateUserDto)
            })

            test('then it should called userService', () => {
                expect(usersService.update).toHaveBeenCalledWith(userStub().userId, updateUserDto)
            })

            test('then it should return a user', () => {
                expect(user).toEqual(userStub())
            })
        })
    })
})