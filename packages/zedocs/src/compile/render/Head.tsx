interface Props {
  title: string
  site: string
  description?: string
  url?: string
}

export function Head({ title, site, description, url }: Props) {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/static/zedocs.css" />

      <title>{title !== site ? `${title} — ${site}` : title}</title>
      {description && <meta name="description" content={description} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={site} />
      <meta name="twitter:card" content="summary" />
    </head>
  )
}
