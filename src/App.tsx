import { useState } from "react";

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const validateCardNumber = (value: any) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) {
      return "Номер карты должен содержать от 13 до 19 цифр";
    }
    return "";
  };

  const validateExpiry = (value: any) => {
    const [month, year] = value.split("/");

    if (!month || !year || month.length !== 2 || year.length !== 2) {
      return "Неверный формат (MM/YY)";
    }

    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (monthNum < 1 || monthNum > 12) {
      return "Месяц должен быть от 01 до 12";
    }

    if (yearNum < 21 || yearNum > 26) {
      return "Год должен быть от 21 до 26";
    }

    return "";
  };

  const validateCvv = (value: any) => {
    if (!/^\d{3}$/.test(value)) {
      return "Код должен состоять из 3 цифр";
    }
    return "";
  };

  const validateCardName = (value: any) => {
    const words = value.trim().split(/\s+/);

    if (words.length < 2) {
      return "Введите имя и фамилию";
    }

    if (/[^a-zA-Zа-яА-Я\s-]/.test(value)) {
      return "Имя не должно содержать цифр или спецсимволов";
    }

    return "";
  };

  const handleChange = (field: any, value: any) => {
    switch (field) {
      case "cardNumber":
        const formatted = value
          .replace(/\D/g, "")
          .replace(/(\d{4})/g, "$1 ")
          .trim();
        setCardNumber(formatted);
        setErrors({ ...errors, cardNumber: validateCardNumber(value) });
        break;
      case "expiry":
        let formattedExpiry = value;
        if (value.length === 2 && !value.includes("/")) {
          formattedExpiry = value + "/";
        }
        setExpiry(formattedExpiry);
        setErrors({ ...errors, expiry: validateExpiry(formattedExpiry) });
        break;
      case "cvv":
        if (value.length <= 3) {
          setCvv(value);
          setErrors({ ...errors, cvv: validateCvv(value) });
        }
        break;
      case "cardName":
        setCardName(value.toUpperCase());
        setErrors({ ...errors, cardName: validateCardName(value) });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newErrors = {
      cardNumber: validateCardNumber(cardNumber),
      expiry: validateExpiry(expiry),
      cvv: validateCvv(cvv),
      cardName: validateCardName(cardName),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");

    if (isValid) {
      alert("Оплата прошла успешно!");
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setCardName("");
      setErrors({ cardNumber: "", expiry: "", cvv: "", cardName: "" });
    }
  };

  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
      <div className="w-[457px] h-[464px] pl-[20px] border border-[#d9dee2] rounded-[10px]">
        <h1 className="text-title mt-[32px] w-[368px] h-[32px]">
          Оплата банковской картой
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="min-h-[84px] w-[417px] mt-[20px]">
            <p className="text-grey-800 text-button">Номер карты</p>
            <input
              className={`w-[417px] h-[40px] mt-[4px] rounded-[10px] pl-[14px] border ${
                errors.cardNumber ? "border-red-500" : "border-[#d9dee2]"
              } hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none`}
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => handleChange("cardNumber", e.target.value)}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="flex gap-[77px] mt-[20px]">
            <div className="min-h-[84px] w-[170px]">
              <p className="text-grey-800 text-button">Месяц/Год</p>
              <input
                className={`w-[170px] h-[40px] rounded-[10px] mt-[4px] pl-[14px] border ${
                  errors.expiry ? "border-red-500" : "border-[#d9dee2]"
                } hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none`}
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => handleChange("expiry", e.target.value)}
              />
              {errors.expiry && (
                <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
              )}
            </div>

            <div className="min-h-[84px] w-[170px]">
              <p className="text-grey-800 text-button">Код</p>
              <input
                className={`w-[170px] h-[40px] rounded-[10px] mt-[4px] pl-[14px] border ${
                  errors.cvv ? "border-red-500" : "border-[#d9dee2]"
                } hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none`}
                type="password"
                placeholder="***"
                value={cvv}
                onChange={(e) => handleChange("cvv", e.target.value)}
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div className="mt-[20px] min-h-[84px] w-[417px]">
            <p className="text-grey-800 text-button">Владелец карты</p>
            <input
              className={`w-[417px] h-[40px] rounded-[10px] pl-[14px] mt-[4px] border ${
                errors.cardName ? "border-red-500" : "border-[#d9dee2]"
              } hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none`}
              type="text"
              placeholder="IVAN IVANOV"
              value={cardName}
              onChange={(e) => handleChange("cardName", e.target.value)}
            />
            {errors.cardName && (
              <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
            )}
          </div>

          <div className="mt-[20px] flex justify-end pr-[20px]">
            <button
              type="submit"
              className="w-[123px] h-[48px] rounded-[10px] bg-grey-100 cursor-pointer hover:bg-blue-100 transition-colors"
            >
              Оплатить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
