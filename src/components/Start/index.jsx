import HorizontalScrollText from '../../components/HorizontalScrollText';
import HorizontalScrollText2 from '../../components/HorizontalScrollText2';
import HorizontalScrollText3 from '../../components/HorizontalScrollText3';
import styles from './style.module.css';

export default function Start() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HorizontalScrollText />
      </main>
      <section  id="nextSection">
      <HorizontalScrollText2 />
      </section>
      <HorizontalScrollText3 />

    </div>
  );
}