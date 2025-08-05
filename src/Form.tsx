import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const [firstname, lastname] = data.fullName.split(" ");
    const id = uuidv4();

    try {
      const res = await axios.post("http://localhost:2050/api", {
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

      const pid = res.data?.result?.pid;

      if (pid) {
        navigate(`/${pid}`);
      } else {
        throw new Error("PID не получен");
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Произошла ошибка при оплате");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[457px] h-auto p-[20px] border border-[#d9dee2] rounded-[10px]">
        <h1 className="text-xl font-semibold mt-[12px] mb-[20px]">
          Оплата банковской картой
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Номер карты</label>
            <input
              type="text"
              {...register("cardNumber")}
              className={`w-full h-[40px] rounded-[10px] pl-[14px] border ${
                errors.cardNumber ? "border-red-500" : "border-[#d9dee2]"
              } focus:outline-none`}
              placeholder="0000000000000000"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">
                Срок действия (MM/YY)
              </label>
              <input
                type="text"
                {...register("expiration")}
                className={`w-full h-[40px] rounded-[10px] pl-[14px] border ${
                  errors.expiration ? "border-red-500" : "border-[#d9dee2]"
                } focus:outline-none`}
                placeholder="MM/YY"
              />
              {errors.expiration && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.expiration.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-sm mb-1">CVV</label>
              <input
                type="password"
                {...register("cvv")}
                className={`w-full h-[40px] rounded-[10px] pl-[14px] border ${
                  errors.cvv ? "border-red-500" : "border-[#d9dee2]"
                } focus:outline-none`}
                placeholder="***"
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1">Имя и фамилия</label>
            <input
              type="text"
              {...register("fullName")}
              className={`w-full h-[40px] rounded-[10px] pl-[14px] border ${
                errors.fullName ? "border-red-500" : "border-[#d9dee2]"
              } focus:outline-none`}
              placeholder="Иван Иванов"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-[10px] hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Отправка..." : "Оплатить"}
          </button>
        </form>
      </div>
    </div>
  );
}
