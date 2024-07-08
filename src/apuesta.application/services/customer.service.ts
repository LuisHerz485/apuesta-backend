import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/apuesta.application.dto/customer/createCustomer.dto';
import { Customer } from 'src/apuesta.domain.entities/models/customer.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginRequestDto } from 'src/apuesta.application.dto/customer/loginRequest.dto';
import * as jwt from 'jsonwebtoken';
import {
    EXPIRES_TIME,
    JWT_PASS,
} from 'src/apuesta.infraestructure.cross.cuting/constants/jwt.const';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async findOne(id: number): Promise<Customer> {
        try {
            const options: FindOneOptions<Customer> = {
                where: { id },
            };
            return await this.customerRepository.findOne(options);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findByUserName(userName: string): Promise<Customer> {
        return await this.customerRepository.findOneBy({ userName });
    }

    public async create(request: CreateCustomerDto) {
        try {
            const params = {
                userName: request.userName,
                password: await bcrypt.hash(request.password, 10),
            };
            const customer = this.customerRepository.create(params);
            return await this.customerRepository.save(customer);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async login({ userName, password }: LoginRequestDto) {
        try {
            const customer = await this.findByUserName(userName);

            if (customer) {
                const passwordMatch = await bcrypt.compare(
                    password,
                    customer.password,
                );

                if (passwordMatch) {
                    const token = jwt.sign(
                        { userId: customer.id, username: customer.userName },
                        JWT_PASS,
                        { expiresIn: EXPIRES_TIME },
                    );

                    return {
                        message: 'Login exitoso',
                        token: token,
                        idUserName: customer.id,
                    };
                } else {
                    throw new HttpException(
                        'Credenciales inválidas',
                        HttpStatus.UNAUTHORIZED,
                    );
                }
            } else {
                throw new HttpException(
                    'Usuario no encontrado',
                    HttpStatus.NOT_FOUND,
                );
            }
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async discountAmount(id: number, price: number) {
        try {
            const customerExist = await this.findOne(id);

            if (!customerExist) {
                throw new HttpException('No existe', HttpStatus.NOT_FOUND);
            }

            customerExist.amount -= price;

            this.customerRepository.save(customerExist);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async rollBackAmount(id: number, price: number) {
        try {
            const customerExist = await this.findOne(id);

            if (!customerExist) {
                throw new HttpException('No existe', HttpStatus.NOT_FOUND);
            }

            customerExist.amount += price;

            this.customerRepository.save(customerExist);
        } catch (error) {
            throw new HttpException(
                `Error : ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
