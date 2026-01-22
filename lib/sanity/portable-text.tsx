import { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from './image'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(1200).height(600).url()}
            alt={value.alt || 'Image'}
            width={1200}
            height={600}
            className="rounded-lg"
            sizes="100vw"
          />
          {value.alt && (
            <p className="text-sm text-foreground/60 mt-2 text-center">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
    code: ({ value }) => {
      return (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4 border border-border">
          <code className="text-sm">{value?.code}</code>
        </pre>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-3 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-foreground/90 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-2">{children}</li>,
    number: ({ children }) => <li className="ml-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href
      if (!href) return <>{children}</>
      const isExternal = href.startsWith('http')
      return (
        <Link
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline"
        >
          {children}
        </Link>
      )
    },
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono border border-border">
        {children}
      </code>
    ),
  },
}
