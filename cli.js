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
    const dirsToCreate = [
      { path: moduleDir, template: `export default class ${capitalizeFirstLetter(name)} {}`, file: 'services.ts' },
      { path: path.join(moduleDir, 'AgGrid') },
      { path: path.join(moduleDir, 'components') },
      { path: path.join(moduleDir, 'pages'), template: `<template>\n    <div>\n        ${name}\n    </div>\n</template>\n\n<script setup lang='ts'>\n</script>\n\n<style scoped>\n</style>\n`, file: `${name}.vue` },
      { path: path.join(moduleDir, 'store'), template: `export class ${capitalizeFirstLetter(name)}Store {}`, file: `${name}Store.ts` },
      { path: moduleDir, template: `export default []`, file: 'routes.ts' },
      { path: path.join(moduleDir, 'types'), template: `export interface ${capitalizeFirstLetter(name)} {}`, file: 'index.ts' },
      { path: moduleDir, template: `export { default as routes } from './routes'`, file: 'index.ts' },
      { path: path.join(moduleDir, 'validator'), template: `export const ${capitalizeFirstLetter(name)} = ({}) => {};\n`, file: `${name}.ts` },
    ];

    dirsToCreate.forEach(({ path: dirPath, template, file }) => {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });

        if (template && file) {
          const filePath = path.join(dirPath, file);
          fs.writeFileSync(filePath, template);
        }
      } else {
        if (template && file) {
          const filePath = path.join(dirPath, file);
          fs.writeFileSync(filePath, template);
        }
      }
    });

    console.log(`Módulo ${name} criado com sucesso!`);
  });

program.parse(process.argv);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
