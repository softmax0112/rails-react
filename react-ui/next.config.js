module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
}

// function style:
// module.exports = (phase, { defaultConfig }) => {
//   return {}
// }

// note: trailing slash helps facilitate static deployment especially on hosts such as s3
// @see https://nextjs.org/docs/api-reference/next.config.js/exportPathMap#adding-a-trailing-slash
