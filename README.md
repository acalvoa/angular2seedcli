# Angular 2 Seed Cli - [From angular Seed 2 mgechev](https://github.com/mgechev/angular-seed)

Angular seed 2 Cli is a project to help any develop of angular app using the angular seed 2 project. The cli can generate components, services, shared components, directives and pipes using only the command line with a structured notation and very ordered folder estructure.

## INSTALATION

```bash
npm install angularseedcli -g
```
## USAGE
- For create a new project you can use the next command

```bash
as2cli init [nameproject] --fast --git [remote_repository]
```
The command clone the latest repository of angular 2 cli, and make the folder and modules structure.
If you specify the fast option, the cli not execute the npm install command to install the vendor dependencies.

If you specify the git option like (--git) , the cli init a empty git repository with a branch as2cli.

If you specify the git option with a remote repository like (--git remote_repository) , the cli init a repository with the master branch of the remote project, and a branch named as2cli with the angular project.

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
- Component with child route
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
#### Example
```bash
as2cli generate shared header
```

### Pipe
To generate a new pipe and subscribe to the pipes module. This command receive one option that specifies the pipe callname into the html document.

#### Usage
```bash
as2cli generate pipe [name] -p [pipe callname]
```
#### Example
```bash
as2cli generate pipe clp -p CLP
```
### Directive
To generate a new directive and subscribe to the directives module. This command receive one option that specifies the directive selector name into the html document.

#### Usage
```bash
as2cli generate directive [name] -d [selector]
```
#### Example
```bash
as2cli generate directive rutformater -d RutFormater
```
### Class
To generate a new class and add to classes folder. 

#### Usage
```bash
as2cli generate class [name] 
```
#### Example
```bash
as2cli generate class client
```
## Contributors

Thanks to all beautiful people than make be possible this project

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
[<img src="https://avatars3.githubusercontent.com/u/806569?s=400&v=4" width="100px;"/><br /><sub><b>Sebastian Gonzalez V.</b></sub>](https://github.com/brutalchrist)<br />[📖](https://github.com/acalvoa/EARLGREY/commits?author=brutalchrist "Documentation") [💻](https://github.com/acalvoa/EARLGREY/commits?author=brutalchrist)
<!-- ALL-CONTRIBUTORS-LIST:END -->
