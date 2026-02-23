interface PageTransitionProps {
  children: React.ReactNode
  key?: string | number
}

export function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>
}
