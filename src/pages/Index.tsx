import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/components/common/ThemeToggle'

export default function Index() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/anyx-logo.png" alt="AnyX" className="w-10 h-10" />
            <h1 className="text-xl font-semibold">AnyX Boilerplate</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <img 
              src="/anyx-logo.png" 
              alt="AnyX Logo" 
              className="w-24 h-24 mx-auto mb-6 opacity-90"
            />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to AnyX
            </h2>
            <p className="text-xl text-muted-foreground">
              Your production-ready React boilerplate
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-4 md:grid-cols-2 mb-8"
          >
            <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate('/recipes')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  UI Recipes
                </CardTitle>
                <CardDescription>
                  Pre-built animated components ready to use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hero sections, features, effects, and more
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate('/themes')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎭</span>
                  Theme System
                </CardTitle>
                <CardDescription>
                  10 beautiful theme presets to choose from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Customize colors, spacing, and typography
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate('/dashboard')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Dashboard
                </CardTitle>
                <CardDescription>
                  Protected route example with auth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Authentication and authorization built-in
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate('/showcase')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  Showcase
                </CardTitle>
                <CardDescription>
                  See all features in action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Full-featured demo with animations
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <Button size="lg" onClick={() => navigate('/recipes')}>
              Get Started
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>React • TypeScript • Tailwind CSS • Framer Motion</p>
        </div>
      </footer>
    </div>
  )
}
