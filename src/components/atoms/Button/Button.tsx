import styles from "./Button.module.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button(props: Props) {
  const { children, onClick, type = "button" } = props;

  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
