import React, { useEffect } from "react";
import styles from "./Twitter.module.css";

interface TwitterEmbedProps {
  twitUrl: string;
}
const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ twitUrl }) => {
  useEffect(() => {
    const scriptsrc = "https://platform.twitter.com/widgets.js";

    if (document.querySelector(`script[src="${scriptsrc}"]`)) {
      if ((window as any).twttr) {
        (window as any).twttr.widgets.load();
      }
    } else {
      const script = document.createElement("script");
      script.src = scriptsrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [twitUrl]);

  return (
    <div className={styles.contenedor}>
      <blockquote className="twitter-tweet">
        <a href={twitUrl}>..Cargando post</a>
      </blockquote>
    </div>
  );
};
export default TwitterEmbed;
