Currently making a scalable clean architecture:

domain: business rules
- entities: pure business entities with their methods
- services: reusable pure business rules ( like check valid subscription ) ( import directly to use cases, since it is business rules ) ( if it needs dependency, add it in the external interface )
- repositories interfaces: defines the actual needed functions and their input and output
NOTE: If an entity needs a provider to do something in its methods, inject it from either a service
or a factory
ALSO, BUSINESS LOGIC SHOULD NOT DO SIDE EFFECTS ( ONLY USE CASES CAN DO THAT VIA ITS INJECTED DATA, AND THE ENTITIES VIA FACTORIES )

application:
- use case: establishes one something of anything
- application DTOs: input output dtos, idk ?
- ports: = infra/services interfaces to the services I am pulling from the infrastructure/providers ( like emailservice )

infrastructure:
- providers: contains all providers initialization and tools I need, like redis, mongodb, sequelize, logging, etc
- services: contains all functions and states providers can have
- database: models, seeders & migrations
- repositories implementation: tightly coupled with the database external interface
- wrappers: for request and response for node js

interfaces:
- controllers: thin layer that handles request and response, and sends all injected things to the use cases
- A LAYER X THAT INJECTS VALIDATION DTOS TO REQUESTS, AND ADDS MIDDLEWARES ?? OR DO IT BELOW ?? ( do it below )
- routes: these inject the following after the above layer finishes its work: repositories, providers, etc.. to controllers
- http/DTOs: FOR VALIDATING REQUESTS AND RESPONSES
- middlewares: these should not be tied to business logic, but rather be tied to the technical side of things 

main:
- a folder with files that initialize infrastructure, and registers routes

TO ADD LATER:
- value objects, domain events

Logging is injected through ports ??? I think it is better to directly import it I guess


Some changes chatgpt wanted me to do:
- application folder, interfaces/controllers or http/routes or socket would be separated into features

di, tsyringe, and helmet ?


We can add utils:
- pure no side effects: /utils
- side effects: /infra/services
- business logic: /domain/services