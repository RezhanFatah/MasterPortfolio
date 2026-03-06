import { siteConfig } from '@/lib/config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
        <p>
          &copy; {year}{' '}
          <span className="font-semibold text-foreground/70">{siteConfig.name}</span>
        </p>
        <div className="flex items-center gap-6">
          <a
            href={siteConfig.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.socialLinks.email}
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
