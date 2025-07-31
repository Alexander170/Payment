function App() {
  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center">
      <div className="w-[457px] h-[464px]">
        <h1 className="text-title">Оплата банковской картой</h1>
        <p>Номер карты</p>
        <input type="text" placeholder="0000 0000 0000 0000" />
        <div>
          <p>Месяц/Год</p>
          <input type="text" placeholder="Default" />
          <p>Код</p>
          <input type="text" placeholder="***" />
        </div>
        <p>Владелец карты</p>
        <input type="text" placeholder="IVAN IVANOV" />
        <button className="">Оплатить</button>
      </div>
    </div>
  );
}

export default App;
