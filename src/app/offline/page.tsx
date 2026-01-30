'use client'

import { WifiOff, RefreshCw, CloudOff, Signal } from 'lucide-react'

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-500/8 rounded-full blur-[80px] animate-pulse-slow delay-1000" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 -m-4 border-2 border-dashed border-cyan-500/20 rounded-full animate-spin-slow" />
          
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 rounded-3xl blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-800/90 dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl border border-cyan-500/20 backdrop-blur-xl" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <WifiOff className="w-16 h-16 text-cyan-400/80" strokeWidth={1.5} />
            </div>

            <div className="absolute -top-2 -right-2 p-2 bg-slate-900/90 dark:bg-slate-800/70 rounded-xl border border-cyan-500/30">
              <CloudOff className="w-4 h-4 text-cyan-500/60" />
            </div>
            <div className="absolute -bottom-2 -left-2 p-2 bg-slate-900/90 dark:bg-slate-800/70 rounded-xl border border-emerald-500/30">
              <Signal className="w-4 h-4 text-emerald-500/60" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
          Anda Sedang Offline
        </h1>
        
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
          Sepertinya koneksi internet Anda terputus. 
          Periksa jaringan Anda dan coba lagi.
        </p>

        <button
          onClick={handleRetry}
          className="group inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span>Coba Lagi</span>
        </button>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground/60">
          <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span>Menunggu koneksi...</span>
        </div>
      </div>

      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
    </main>
  )
}
