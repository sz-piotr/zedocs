# Basic Syntax

This page is dedicated to discussing markdown syntax.

`Code inline`. Variations `a` include `longer` and `many words`.

Single line code block.

```
This is a code block.
```

Multi line code block

```
lorem ipsum
I am the second line.
Watch me man!
```

Html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p>foo &apos;</p>
  <!-- comment -->
</body>
</html>
```

css

```css
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* foo */

hr.foo > a[x=2] {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}
```

js

```js
const button = document.querySelector('.dark-mode');
button.style.display = 'block';
if (prefersDark) {
  darkModeEnabled = true;
}
button.addEventListener('click', () => {
  darkModeEnabled = !darkModeEnabled;
  const theme = darkModeEnabled ? 32 : 123e5;
});
```
