import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserSite = repositoryName?.endsWith('.github.io')
const githubPagesBase =
  process.env.GITHUB_ACTIONS && repositoryName && !isUserSite
    ? `/${repositoryName}/`
    : '/'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || githubPagesBase,
  plugins: [react(), tailwindcss()],
})
