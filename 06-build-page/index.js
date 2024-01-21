const fs = require('fs').promises;
const fse = require('fs-extra');
const path = require('path');
//
async function buildPage() {
  const dir = '06-build-page';
  await fs.mkdir(path.join(dir, 'project-dist'), { recursive: true });

  let template = await fs.readFile(path.join(dir, 'template.html'), 'utf8');

  template = await replaceTemplateTags(template, dir);

  await fs.writeFile(path.join(dir, 'project-dist/index.html'), template);

  const styles = await compileStyles(dir);

  await fs.writeFile(path.join(dir, 'project-dist/style.css'), styles);

  await fse.copy(
    path.join(dir, 'assets'),
    path.join(dir, 'project-dist/assets'),
  );
}

async function replaceTemplateTags(template, dir) {
  const componentNames = template
    .match(/{{(.*?)}}/g)
    .map((tag) => tag.slice(2, -2));

  for (const name of componentNames) {
    const componentPath = path.join(dir, 'components', `${name}.html`);
    try {
      await fs.access(componentPath);
      const componentContent = await fs.readFile(componentPath, 'utf8');
      template = template.replace(`{{${name}}}`, componentContent);
    } catch (error) {
      template = template.replace(`{{${name}}}`, '');
    }
  }

  return template;
}

async function compileStyles(dir) {
  const styleFiles = await fs.readdir(path.join(dir, 'styles'));
  let styles = '';
  for (const file of styleFiles) {
    const style = await fs.readFile(path.join(dir, 'styles', file), 'utf8');
    styles += style;
  }
  return styles;
}

buildPage().catch(console.error);
