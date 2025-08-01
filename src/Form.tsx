import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useStatusStore } from "./store";
import axios from "axios";

const schema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Номер карты должен содержать 16 цифр"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV должен содержать 3 или 4 цифры"),
  expiration: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Срок действия должен быть в формате MM/YY"
    ),
  fullName: z
    .string()
    .regex(
      /^[A-Za-zА-Яа-яёЁ]+ [A-Za-zА-Яа-яёЁ]+$/,
      "Введите имя и фамилию через пробел"
    ),
});

type FormData = z.infer<typeof schema>;

export default function CardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { setStatus } = useStatusStore();

  const onSubmit = async (data: FormData) => {
    const [firstname, lastname] = data.fullName.split(" ");
    const id = uuidv4();

    setStatus("loading");

    try {
      await axios.post("/api", {
        jsonrpc: "2.0",
        id,
        method: "pay",
        params: {
          pan: data.cardNumber,
          expire: data.expiration,
          cardholder: `${firstname} ${lastname}`,
          cvc: data.cvv,
        },
      });

      setStatus("ok");
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setStatus("fail");
    }
  };

  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
      <div className="w-[457px] h-[464px] pl-[20px] border border-[#d9dee2] rounded-[10px]">
        <h1 className="text-title mt-[32px] w-[368px] h-[32px]">
          Оплата банковской картой
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[20px]">
          <div className="min-h-[84px] w-[417px]">
            <p className="text-grey-800 text-button">Номер карты</p>
            <input
              type="text"
              {...register("cardNumber")}
              className={`w-[417px] h-[40px] mt-[4px] rounded-[10px] pl-[14px] border ${
                errors.cardNumber ? "border-red-500" : "border-[#d9dee2]"
              } hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none`}
              placeholder="0000 0000 0000 0000"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="flex gap-[77px] mt-[20px]">
            <div className="min-h-[84px] w-[170px]">
              <p className="text-grey-800 text-button">Месяц/Год</p>
              <input
                type="text"
                {...register("expiration")}
                className={`w-[170px] h-[40px] rounded-[10px] mt-[4px] pl-[14px] border ${
                  errors.expiration ? "border-red-500" : "border-[#d9dee2]"
                } hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none`}
                placeholder="MM/YY"
              />
              {errors.expiration && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.expiration.message}
                </p>
              )}
            </div>

            <div className="min-h-[84px] w-[170px]">
              <p className="text-grey-800 text-button">Код</p>
              <input
                type="password"
                {...register("cvv")}
                className={`w-[170px] h-[40px] rounded-[10px] mt-[4px] pl-[14px] border ${
                  errors.cvv ? "border-red-500" : "border-[#d9dee2]"
                } hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none`}
                placeholder="***"
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-[20px] min-h-[84px] w-[417px]">
            <p className="text-grey-800 text-button">Владелец карты</p>
            <input
              type="text"
              {...register("fullName")}
              className={`w-[417px] h-[40px] rounded-[10px] pl-[14px] mt-[4px] border ${
                errors.fullName ? "border-red-500" : "border-[#d9dee2]"
              } hover:border-[#d9dee2] focus:border-[#d9dee2] focus:outline-none`}
              placeholder="IVAN IVANOV"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
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
