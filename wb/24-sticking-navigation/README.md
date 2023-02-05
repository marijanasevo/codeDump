# Sticking navigation

- If `window.scrollY > nav.offsetTop` 
- Add `.fixed-nav` to `<body>`, otherwise remove.
- `nav` already has `position: relative; top: 0`
- When the condition is truthy:  
`.fixed-nav nav { position: fixed }` 

## Content jumps up when nav gets position fixed

`<nav>` is removed from the document flow when it's `position` is `fixed`. The rest of the content jumps up to fill this space.
- If `<nav>` is `fixed` add `padding-top` to the `<body>` as big as the `<nav>` is tall (without hard-coding because something like `font-size` could change and affect `<nav>`). Otherwise remove `padding-top` from `<body>`
  - `document.body.style.paddingTop = nav.offsetHeight + 'px'`

## Logo shows when nav is fixed

- Default prop for `li.logo` is  `max-width: 0; transition: all .5s` 
- When `.fixed-nav` logo has `max-width` of something bigger than it will ever be, like `700px`
- Tried, but won't animate:
  - `width: 0` -> `width: auto`
  - `max-width: 0` -> `width: fit-content`


## Content gets bigger when fixed

- `.content { transform: scale(0.98);
  transition: transform 0.5s }`
- `.fixed-nav .content { transform: scale(1) }`