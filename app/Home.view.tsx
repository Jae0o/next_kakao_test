import style from "./Home.styles.module.css";

interface HomeViewProps {
  onClick: () => void;
  isLoading: boolean;
}

const HomeView = ({ onClick, isLoading }: HomeViewProps) => {
  return (
    <section className={style.home__layout}>
      <button
        className={style.home__button}
        onClick={onClick}
        disabled={isLoading}
      >
        측정 하러 가기
      </button>
    </section>
  );
};

export default HomeView;
