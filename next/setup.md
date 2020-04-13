## NextJS setting up a new project

1.  `yarn create next-app <name of app>`

2.  `yarn add @next/mdx classnames critters-webpack-plugin next next-compose-plugins next-images next-optimized-images react-icons`

3.  Copy the next.config.js in the root of the project

4.  Add tailwindcss

        1. yarn add -D tailwindcss postcss-preset-env
        2. Configure scripts:

        "scripts": {
                "dev": "next",
                "build": "next build",
                "start": "next start",
                "export": "next build && next export"
        },

5.  In the root directory: `npx tailwind init`

6.  Add post.config.js file to the root directory:

        module.exports = {
                plugins: [
                        "tailwindcss",
                        "postcss-import",
                        "autoprefixer",
                        "postcss-preset-env",
                        [
                        "@fullhuman/postcss-purgecss",
                        process.env.NODE_ENV === "production"
                                ? {
                                content: ["./pages/**/*.js", "./components/**/*.js"],
                                whitelist: ["html", "body"],
                                defaultExtractor: (content) =>
                                content.match(/[\w-/:]+(?<!:)/g) || [],
                                }
                                : false,
                        ],
                ],
        }

7)  Create an assets directory with a css subdirectory and a styles.css file

        /* purgecss start ignore */
        @tailwind base;
        /* purgecss end ignore */
        @tailwind components;
        @tailwind utilities;

8)  Create an \_app.js page in the pages directory:

        import "../public/assets/css/styles.css"

        import { ContextProvider } from "../context"
        import { Navbar } from "../components"

        export default function MyApp({ Component, pageProps }) {
                return (
                        <ContextProvider>
                                <Navbar />
                                <Component {...pageProps} />
                        </ContextProvider>
                )
        }

9.  Create a .eslintrc.json file in root:

        {
                "parserOptions": {
                        "ecmaVersion": 6,
                        "sourceType": "module",
                        "ecmaFeatures": {
                                "jsx": true
                        }
                },
                "rules": {
                        "react/react-in-jsx-scope": "off"
                }
        }

10. Deploying

        1. Import project from github https://zeit.co/dashboard
        2. Now everytime to master it will publish

11) Troubleshooting

        1. https://zeit.co/docs/v2/platform/deployments#preview
        2. https://zeit.co/docs/v1/features/aliases
