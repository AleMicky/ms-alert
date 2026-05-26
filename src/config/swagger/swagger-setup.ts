import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const swaggerDocumentOptions: SwaggerDocumentOptions = {
  deepScanRoutes: true,
  operationIdFactory: (controllerKey: string, methodKey: string) =>
    `${controllerKey}_${methodKey}`,
};

export const swaggerSetup = (
  app: INestApplication,
  apiPrefix: string,
): void => {
  const config = new DocumentBuilder()
    .setTitle('MS Alert')
    .setDescription(
      'API para gestión de alertas, eventos, reglas y canales de notificación. ' +
        'Los cuerpos de solicitud muestran tipos de dato y ejemplos listos para probar.',
    )
    .setVersion('1.0')
    .addTag('Sistemas cliente', 'Registro de sistemas que emiten eventos')
    .addTag('Tokens', 'Tokens de autenticación por sistema')
    .addTag('Niveles de severidad', 'Catálogo de severidades y prioridades')
    .addTag('Canales de notificación', 'Webhooks y canales (Telegram, Teams, etc.)')
    .addTag('Eventos', 'Eventos recibidos desde sistemas externos')
    .addTag('Reglas de alerta', 'Reglas que generan alertas a partir de eventos')
    .addTag('Alertas', 'Alertas generadas y su seguimiento')
    .addTag('Notificaciones', 'Envíos de alertas a canales')
    .addTag('Pruebas', 'Endpoints de integración y pruebas')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
    swaggerDocumentOptions,
  );
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
};
