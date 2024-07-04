#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const program = new Command();

program
  .version('1.0.0')
  .description('CLI para criar módulos Vue.js conforme a arquitetura');

program
  .command('create-module <name>')
  .description('Cria um novo módulo')
  .action(async (name) => {


    const moduleDir = path.join(process.cwd(), 'src', 'modules', name);
    const AgGrid = path.join(moduleDir, 'AgGrid');
    const componentsDir = path.join(moduleDir, 'components');
    const pagesDir = path.join(moduleDir, 'pages');
    const storeDir = path.join(moduleDir, 'store');
    const typesDir = path.join(moduleDir, 'types');
    const validatorDir = path.join(moduleDir, 'validator');


    // Criar diretórios
    if (!fs.existsSync(moduleDir)) {
      fs.mkdirSync(moduleDir);

      // Caminho completo para o arquivo de serviços do módulo
      const servicePath = path.join(moduleDir, `services.ts`);
      const serviceTemplate = `export default class ${capitalizeFirstLetter(name)} {}`;
      fs.writeFileSync(servicePath, serviceTemplate);


      // Caminho completo para o arquivo de rotas do módulo
      const routesPath = path.join(moduleDir, 'routes.ts');
      const routesTemplate = `export default []`;
      fs.writeFileSync(routesPath, routesTemplate);


      // Caminho completo para index do módulo
      const indexFilePath = path.join(moduleDir, 'index.ts');
      const indexTemplate = `export { default as routes } from './routes'`;
      fs.writeFileSync(indexFilePath, indexTemplate);
    }

    if (!fs.existsSync(AgGrid)) {
      fs.mkdirSync(AgGrid);
    }

    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir);
    }

    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir);

      const pagePath = path.join(pagesDir, `${name}.vue`);
      const pageTemplate = `<template>
    <div>
        ${name}
    </div>
</template>

<script setup lang='ts'>
</script>

<style scoped>
</style>
      `;

        fs.writeFileSync(pagePath, pageTemplate);
    }

    if (!fs.existsSync(storeDir)) {
      fs.mkdirSync(storeDir);

        const storePath = path.join(storeDir, `${name}Store.ts`);
        const storeTemplate = `export class ${capitalizeFirstLetter(name)}Store {}`;

        fs.writeFileSync(storePath, storeTemplate);
    }

    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir);
      
      const typesPath = path.join(typesDir, 'index.ts');
      const typesTemplate = `export interface ${capitalizeFirstLetter(name)} {}`;
      fs.writeFileSync(typesPath, typesTemplate);
    }

    if (!fs.existsSync(validatorDir)) {
      fs.mkdirSync(validatorDir);

      const validatorPath = path.join(validatorDir, `${name}.ts`);
      const validatorTemplate = `export const ${capitalizeFirstLetter(name)} = ({}) => {};`;
        fs.writeFileSync(validatorPath, validatorTemplate);
    }


    console.log(`Módulo ${name} criado com sucesso!`);
  });

program.parse(process.argv);



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}