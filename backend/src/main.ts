import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  // Verificar se já existem usuários
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
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configurar validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Project Management API')
    .setDescription('API para gestão de projetos e autenticação')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Popular dados iniciais
  const dataSource = app.get(DataSource);
  await seedUsers(dataSource);

  await app.listen(3001, '0.0.0.0');
  console.log("Servidor backend iniciado com sucesso em http://localhost:3001");
  console.log("Documentação Swagger disponível em http://localhost:3001/api");
}
bootstrap();
