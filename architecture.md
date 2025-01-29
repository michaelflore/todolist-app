# Styling

### CSS-in-JS
Emotion

Using the @emotion/react library specific for react

Using css prop with typscript add to tsconfig,json
```
jsxImportSource: "@emotion/react"
```

Add to vite config to have css work properly
```
react(
    {
      jsxImportSource: "@emotion/react"
    }
  )
```

or you can import at the top of each file (optional)
/** @jsxImportSource @emotion/react */
