import { React, useState, useEffect } from "react";
import "./styles/Home.css";

const GoalForm = ({ onClick, drinkStatus }) => {
  return (
    <section className="goal-form">
      <input type="number" placeholder="0 litres" />
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          const goalInput = document.querySelector(".goal-form input");
          let drinkedGoal = 0;
          if (goalInput.value !== "" && goalInput.value !== 0) {
            drinkedGoal = goalInput.value;
            onClick({ drinked: drinkStatus.drinked, drinkGoal: drinkedGoal });
            goalInput.value = null;
            goalInput.placeholder = "Change your goal";
          } else {
            alert("Please enter a valid value");
          }
        }}
      >
        Set goal
      </button>
    </section>
  );
};
const Glasses = ({ onClick, drinkStatus }) => {
  return (
    <section className="glasses">
      <div className="glass-items">
        <div
          className="glass glass-500"
          onClick={() => {
            onClick({
              drinked: drinkStatus.drinked + 0.5,
              drinkGoal: drinkStatus.drinkGoal,
            });
          }}
        >
          500mL
        </div>
        <div
          className="glass glass-250"
          onClick={() => {
            onClick({
              drinked: drinkStatus.drinked + 0.25,
              drinkGoal: drinkStatus.drinkGoal,
            });
          }}
        >
          250mL
        </div>
        <div
          className="glass glass-100"
          onClick={() => {
            onClick({
              drinked: drinkStatus.drinked + 0.1,
              drinkGoal: drinkStatus.drinkGoal,
            });
          }}
        >
          100mL
        </div>
      </div>
    </section>
  );
};

const DrinkStatus = ({ status, goal }) => {
  let sliderDisplay = "block";
  let textColor = "#fff";
  if (status === 0) {
    sliderDisplay = "none";
    textColor = "#131a14";
  }
  return (
    <>
      <section className="drink-status">
        <p style={{ color: textColor }}>
          {status}L/{goal}L
        </p>
        <div
          className="status-card"
          style={{ display: sliderDisplay, width: `${(status / goal) * 100}%` }}
        ></div>
      </section>
    </>
  );
};

const ValuesHistory = () => {
  return (
    <section className="streak-graph">
      <div className="graph-items">
        <div className="item">
          Monday
          <div className="graph-item success">5L/5L</div>
        </div>
        <div className="item">
          Tuesday
          <div className="graph-item fail">0.5/5L</div>
        </div>
      </div>
    </section>
  );
};

function Home() {
  const [drinkStatus, setDrinkStatus] = useState({
    drinked: 0,
    drinkGoal: 0,
  });
  useEffect(() => {
    console.log("u1", "item");
    let item;
    if (JSON.parse(localStorage.getItem("drinkStatus"))) {
      item = JSON.parse(localStorage.getItem("drinkStatus"));
      setDrinkStatus(item);
    }
    return;
  }, []);

  // const data = {
  //   drinkGoal: 4,
  //   drinked: 0.5,
  //   drinkHistory: {
  //     "10/02/23": {
  //       goal: 5,
  //       drink: 4,
  //       success: true,
  //     },
  //     "11/02/23": {
  //       goal: 5,
  //       drink: 4,
  //       success: true,
  //     },
  //     "12/02/23": {
  //       goal: 5,
  //       drink: 4,
  //       success: true,
  //     },
  //   },
  // };

  const glassClickHandler = (newDrinkStatus) => {
    setDrinkStatus(newDrinkStatus);
    localStorage.setItem("drinkStatus", JSON.stringify(newDrinkStatus));
  };
  return (
    <>
      <h1 className="logo">Drinkit</h1>
      <h3>Set your water drinking goal {"(Litres)"}</h3>
      <GoalForm onClick={glassClickHandler} drinkStatus={drinkStatus} />
      <h3>Select the glass you drank now</h3>
      <Glasses onClick={glassClickHandler} drinkStatus={drinkStatus} />
      <h3>Your success status</h3>
      <DrinkStatus status={drinkStatus.drinked} goal={drinkStatus.drinkGoal} />
      <h3>Success History</h3>
      <ValuesHistory />
    </>
  );
}

export default Home;
