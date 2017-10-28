# Angular 2 Seed Cli - [From angular Seed 2 mgechev](https://github.com/mgechev/angular-seed)

Angular seed 2 Cli is a project to help any develop of angular app using the angular seed 2 project. The cli can generate components, services, shared components, directives and pipes using only the command line with a structured notation and very ordered folder estructure.

## INSTALATION

```bash
npm install angularseedcli -g
```
## USAGE
- For create a new project you can use the next command

```bash
as2cli init [nameproject]
```
The command clone the latest repository of angular 2 cli, and make the folder and modules structure

### Example
```bash
as2cli init testproject
```
## GENERATORS

### Feature
To generate a new feature component you can use this command with 2 options. The route option automatically generate a primary route like a independent component. The child route option automatically generate a route like a component inner into IndexComponent. All routes options are the callname of the route.

#### Usage
```bash
as2cli generate feature [name] -r [route] -c [childroute]
```
#### Example

- Component without route
```bash
as2cli generate feature test
```
- Component with route
```bash
as2cli generate feature login -r login
```
- Component with route
```bash
as2cli generate feature dashboard -c dashboard
```
### Service
To generate a new service and inject into the app.

#### Usage
```bash
as2cli generate service [name]
```
#### Example
```bash
as2cli generate service rest
```

### Shared Component
To generate a new shared feature component and subscribe to the shared module.
#### Usage
```bash
as2cli generate shared [name]
```

### Pipe
### Directive


