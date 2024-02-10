import React from "react";
import style from "./styles.module.css";

const TestPage = () => {
  return (
    <section className={style.test__layout}>
      <div className={style.test__area1}></div>
      <div className={style.test__area2}></div>
      <div className={style.test__area3}></div>
      <div className={style.test__area4}></div>
      <div className={style.test__area5} id="testArea"></div>
      <div className={style.test__area6}></div>
      <div className={style.test__area7}></div>
      <div className={style.test__area1}></div>
      <div className={style.test__area2}></div>
    </section>
  );
};

export default TestPage;
