import React from 'react'
import './index.css'

export const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Vibe Coding App</h1>
        <p>Приложение создано с помощью Vibe Coding Tool</p>
      </header>
      
      <main className="app-main">
        <section className="app-section">
          <h2>Добро пожаловать!</h2>
          <p>
            Это базовое React приложение. Начните разработку, редактируя 
            компоненты в папке <code>src/</code>.
          </p>
        </section>
      </main>
      
      <footer className="app-footer">
        <p>© 2024 Vibe Coding Tool</p>
      </footer>
    </div>
  )
}
