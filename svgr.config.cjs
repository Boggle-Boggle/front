const defaultTemplate = (variables, { tpl }) => {
  const name = variables.componentName.replace(/^Svg/, '');

  return tpl`
import type { SVGProps } from "react";

${'\n'}

const ${name} = (${variables.props}) => (
  ${variables.jsx}
);

export default ${name}`;
};

module.exports = {
  icon: true,
  prettier: false,
  typescript: true,
  outDir: './src/components/icons',
  replaceAttrValues: { '#303030': 'currentColor' },
  template: defaultTemplate,
};
