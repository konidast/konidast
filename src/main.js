// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.use(VueScrollTo, {
    duration: 500,
    easing: "ease",
  })

  head.meta.push({
    name: 'keywords',
    content: 'Web Development, Software, Services'
  })

  head.meta.push({
    name: 'description',
    content: 'Tom Konidas |> Full-Stack Developer, Batteries Included.'
  })

  head.meta.push({
    name: 'author',
    content: 'Tom Konidas'
  })

  head.meta.push({
    property: 'og:image',
    name: 'image',
    content: `https://tomkonidas.com/assets/static/avatar.jpg`,
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap'
  })
}

