module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-plugin-logical-css'],
  rules: {
    // logical css
    'plugin/use-logical-properties-and-values': [
      true,
      { severity: 'warning', ignore: ['overflow-y', 'overflow-x'] },
    ],
    'plugin/use-logical-units': [true, { severity: 'warning' }],
    'declaration-property-value-no-unknown': true,
    'no-descending-specificity': [
      true,
      {
        message: '禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器',
      },
    ],
    'no-empty-source': [true, { message: '禁止空源码' }],
    'block-no-empty': [true, { message: '禁止空块' }],
    'selector-type-no-unknown': [
      true,
      {
        // custom-element
        ignoreTypes: ['/^[a-zA-Z]([a-zA-Z0-9]*-[a-zA-Z0-9]+)+/'],
        message: '禁止未知的类型选择器',
      },
    ],
    'unit-allowed-list': [
      'vw',
      'vh',
      'px',
      '%',
      'em',
      'rem',
      's',
      'deg',
      'ms',
      'ex',
      'ch',
      'fr',
      'dvb',
      'dvi',
      'lvb',
      'lvi',
      'svb',
      'svi',
      'vb',
      'vi',
    ],
    'order/order': ['custom-properties', 'declarations', 'dollar-variables', 'rules', 'at-rules'],
    'comment-no-empty': [true, { message: '禁止空注释' }],
    'shorthand-property-no-redundant-values': [true, { message: '禁止简写属性的冗余值' }],
    'value-no-vendor-prefix': [true, { message: '禁止值的浏览器引擎前缀' }],
    'property-no-vendor-prefix': [true, { message: '禁止属性的浏览器引擎前缀' }],
    // 属性的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
    ],
    'function-name-case': [
      'lower',
      {
        message: '函数名称使用小写,以-拼接',
        ignoreFunctions: [/a-z\\-/],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme'],
      },
    ],
    // 不验证@未知的名字
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'function',
          /** tailwindcss */
          'tailwind',
          'apply',
          'layer',
          'config',
        ],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        message: '禁止未知的伪类选择器',
        ignorePseudoClasses: ['global', 'local', 'export', 'slotted'],
      },
    ],
  },
  customSyntax: 'postcss-less',
  overrides: [
    {
      files: [
        '**/*.js',
        '**/*.cjs',
        '**/*.mjs',
        '**/*.jsx',
        '**/*.ts',
        '**/*.tsx'
      ],
      customSyntax: 'postcss-styled-syntax',
      rules: {
        'no-empty-source': null,
        'declaration-property-value-no-unknown': null,
      },
    },
  ],
  ignoreFiles: ['node_modules/**/*', 'es/**/*', 'lib/**/*', 'docs/**/*'],
};
