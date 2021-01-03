# Basic Syntax

With ZeDocs you will be using Markdown to write your documentation. Markdown is
a lightweight markup language with plain-text-formatting syntax.

This page will go over the basics of how to author Markdown files as well as
the basic syntax.

## Markdown files

Markdown files are text files with an extension of `.md`. You can use any text
editor to open and edit Markdown files.

Here is an example of a file called `hello.md`:

```md
# Hello world

This is my _first_ document!
```

## Inline markup

With Markdown you are able to style your text inline. Note that using `_` and
`*` is interchangeable.

| You write          | You see          |
| :----------------- | :--------------- |
| `_italic_`         | _italic_         |
| `**bold**`         | **bold**         |
| `_**both**_`       | _**both**_       |
| `` `code` ``       | `code`           |
| `~~strike~~`       | ~~strike~~       |
| `_hey **nested**_` | _hey **nested**_ |

## Paragraphs

Markdown content is rendered into paragraphs. Each paragraph is separated by
an empty line. Newlines inside the source are ignored so use `<br>` when
necessary.

**Example:**

```md
Hello. This is the first paragraph.

This is the second
paragraph. The newlines
will be ignored. Except this one<br>
It will work.
```

**Will be rendered as:**

Hello. This is the first paragraph.

This is the second
paragraph. The newlines
will be ignored. Except this one<br>
It will work.

## Headings

You can use one or more `#` characters to make a heading. `#` denotes `<h1>`,
`##` denotes `<h2>` and so on up to `######`. It is best practice to only use
one `h1` heading, at the top of the page. Additionally you should limit
yourself to using `#`, `##` and `###`. Deeper nesting makes documents hard to
read and it is better to just split the content into multiple files.

::: info
The first `#` heading is used to determine the page title in ZeDocs.
:::

_Example:_

```md
# Title

## Section

### Subsection
```

## Blockquotes

To create a blockquote, add a `>` in front of a paragraph. You can contain
multiple paragraph inside a blockquote by having `>` at the start of each line
in the blockquote.

Blockquotes can also be nested, by using multiple `>`, e.g. `>>`.

**Example:**

```md
> Single paragraph quote

> This quote contains...
>
> ...multiple paragraphs!
>
> > and also is nested!
```

**Will be rendered as:**

> Single paragraph quote

> This quote contains...
>
> ...multiple paragraphs!
>
> > and also is nested!

## Lists

Lists can be ordered (1, 2, 3) or unordered (using bullet points). Doing this
is simple in markdown.

**Example:**

```md
1.  First item
2.  Second item
    1.  Deeper level

-   Some point
-   Other point
    -   A sub-point
```

**Will be rendered as:**

1.  First item
2.  Second item
    1.  Deeper level

-   Some point
-   Other point
    -   A sub-point

## Code blocks

You already know that it is possible to style code inline using backticks
`` ` ``. But you can also create code blocks with triple backticks ` ``` `.
It is also very easy to have syntax highlighting. Just specify the language
after the backticks e.g. ` ```html `.

**Example:**

    ```
    foo
    ```

    ```html
    <div class="foo">
        <p>This is html code</p>
    </div>
    ```

**Will be rendered as:**

```
foo
```

```html
<div class="foo">
    <p>This is html code</p>
</div>
```

## Links

The syntax for links is very straightforward. Use `[]` to specify the link text
and `()` to specify the links url. You can also and an optional title with `""`.

:::info
In ZeDocs relative links to other markdown files are converted to absolute links
to those files. The linked files are also rendered and included in the output.
:::

**Example:**
```md
[ZeDocs](https://zedocs.org)

Links can also be inline [yay](https://zedocs.org) and can contain markdown
and titles [hover _over_ me](https://zedocs.org "Optional title").

You can also link to other markdown files: [secret page](./secret.md).
```

**Will be rendered as:**

[ZeDocs](https://zedocs.org)

Links can also be inline [yay](https://zedocs.org) and can contain markdown
and titles [hover _over_ me](https://zedocs.org "Optional title").

You can also link to other markdown files: [secret page](./secret.md).

## Images

