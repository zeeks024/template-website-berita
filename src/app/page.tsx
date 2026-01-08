import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="container">
      <section style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>News Portal Initialized</h1>
        <p style={{ color: 'var(--text-muted)' }}>Ready to build.</p>
      </section>
    </main>
  );
}
