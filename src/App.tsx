function App() {
  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
      <div className="w-[457px] h-[464px] pl-[20px] border border-[#d9dee2] rounded-[10px]">
        <h1 className="text-title mt-[32px] w-[368px] h-[32px]">
          Оплата банковской картой
        </h1>
        <div className="h-[84px] w-[417px] mt-[20px]">
          <p className="text-grey-800 text-button">Номер карты</p>
          <input
            className="w-[417px] h-[40px] mt-[4px] rounded-[10px] pl-[14px] border border-[#d9dee2] hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none"
            type="text"
            placeholder="0000 0000 0000 0000"
          />
        </div>
        <div className="flex gap-[77px] mt-[20px]">
          <div className="h-[84px] w-[170px]">
            <p className="text-grey-800 text-button">Месяц/Год</p>
            <input
              className="w-[170px] h-[40px] rounded-[10px] mt-[4px] pl-[14px] border border-[#d9dee2] hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none"
              type="text"
              placeholder="Default"
            />
          </div>
          <div className="h-[84px] w-[170px]">
            <p className="text-grey-800 text-button">Код</p>
            <input
              className="w-[170px] h-[40px] rounded-[10px] mt-[4px] pl-[14px] border border-[#d9dee2] hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none"
              type="text"
              placeholder="***"
            />
          </div>
        </div>
        <div className="mt-[20px] h-[84px] w-[417px]">
          <p className="text-grey-800 text-button">Владелец карты</p>
          <input
            className="w-[417px] h-[40px] rounded-[10px] pl-[14px] mt-[4px] border border-[#d9dee2] hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none"
            type="text"
            placeholder="IVAN IVANOV"
          />
        </div>
        <div className="mt-[20px] flex justify-end pr-[20px]">
          <button className="w-[123px] h-[48px] rounded-[10px] bg-grey-100 cursor-pointer">
            Оплатить
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
