import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <hr className={styles.hr} />
      <p className={styles.text}>
        Desarrollado por <span>Benjamín Lizama</span> y{" "}
        <span>Lucciano Martinez</span> © 2025
      </p>
    </div>
  );
}
