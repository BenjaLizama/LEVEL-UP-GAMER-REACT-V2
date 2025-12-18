import Carousel from "@/components/organisms/Carousel/Carousel";
import styles from "./Home.module.css";
import "@/components/molecules/GuiaCard/GuiaCard";
import GuiaCard from "@/components/molecules/GuiaCard/GuiaCard";
import { GUIAS_INFO } from "@/data/GuiasInfo";
import { MAPS_INFO } from "@/data/MapsInfo";
import Twits from "@/components/molecules/Twits/Twitter";
import Mapa from "@/components/molecules/Mapa/Mapa";
import AboutUs from "@/components/molecules/AboutUs/AboutUs";
import Footer from "@/components/molecules/Footer/Footer";

export default function Home() {
  const lista_imagenes = [
    "https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_and_Lucia_02_With_Logos_landscape.93ab5523.jpg&w=1920&q=75",
    "https://images5.alphacoders.com/139/1397346.jpg",
    "https://cdn.craft.cloud/22b11234-f633-4f7c-8ac2-099f2dba995c/assets/uploads/Jordan_KeyArt_16x9-1.jpg",
  ];

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.carouselContainer}>
        <span className={styles.title}>Proximos lanzamientos</span>
        <Carousel listImages={lista_imagenes} />
      </div>

      <div className={styles.guiasContainer}>
        <span className={styles.title}>Guias de videojuegos</span>
        <div className={styles.guias}>
          {Object.values(GUIAS_INFO).map((n, i) => (
            <GuiaCard
              key={i}
              descripcion={n.CardDescription}
              imagen={n.CardImage}
              titulo={n.CardTitle}
            />
          ))}
        </div>
      </div>

      <div className={styles.tweetsContainer}>
        <span className={styles.title}>Ultimas noticias</span>
        <Twits twitUrl="https://twitter.com/RockstarGames/status/1919746311382851812?ref_src=twsrc%5Etfw" />
        <Twits twitUrl="https://twitter.com/nintendocafe/status/2001402230025412792?ref_src=twsrc%5Etfw" />
        <Twits twitUrl="https://twitter.com/Altiphyre/status/1990390586625425802?ref_src=twsrc%5Etfw" />
        <Twits twitUrl="https://twitter.com/Joanastic/status/2000999711390765525?ref_src=twsrc%5Etfw" />
      </div>

      <div className={styles.mapsContainer}>
        <span className={styles.title}>Encuentranos</span>
        {Object.values(MAPS_INFO).map((n) => (
          <Mapa urlMapa={n} />
        ))}
      </div>

      <div className={styles.aboutUsContainer}>
        <AboutUs />
      </div>

      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}
