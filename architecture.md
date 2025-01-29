# Components
Material UI

It comes packaged with default styles and uses emotion as its default styling engine
Use the icons as well

Need @emotion/styled as well

# Styling

### CSS-in-JS
Emotion

Use the @emotion/react library specific for react

To use css prop with typscript add to tsconfig.json
```
jsxImportSource: "@emotion/react"
```

Add to vite config to have css prop work properly
```
react(
    {
      jsxImportSource: "@emotion/react"
    }
  )
```

or you can import at the top of each file (optional)
/** @jsxImportSource @emotion/react */
