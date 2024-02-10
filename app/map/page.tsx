import { Map } from "react-kakao-maps-sdk";
import styles from "./styles.module.css";

const MapComponents = () => {
  return (
    <section className={styles.map__layout}>
      <Map
        center={{
          lat: 33.450701,
          lng: 126.570667,
        }}
        className={styles.map}
      />
    </section>
  );
};

export default MapComponents;
