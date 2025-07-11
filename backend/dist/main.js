"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
async function seedUsers(dataSource) {
    const userRepository = dataSource.getRepository(user_entity_1.User);
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
        return;
    }
    const initialUsers = [
        {
            name: 'Wade Wilson',
            email: 'deadpool@gmail.com',
            password: '123456',
            alias: 'Deadpool',
        },
    ];
    for (const userData of initialUsers) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
    }
    console.log('Usuários iniciais inseridos com sucesso!');
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Project Management API')
        .setDescription('API para gestão de projetos e autenticação')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const dataSource = app.get(typeorm_1.DataSource);
    await seedUsers(dataSource);
    await app.listen(3001, '0.0.0.0');
    console.log("Servidor backend iniciado com sucesso em http://localhost:3001");
    console.log("Documentação Swagger disponível em http://localhost:3001/api");
}
bootstrap();
//# sourceMappingURL=main.js.map