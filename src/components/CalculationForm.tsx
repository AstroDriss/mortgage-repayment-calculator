import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Calculator from "../assets/icon-calculator.svg";
import { Repayment } from "../App.tsx";

const schema = z.object({
  amount: z.number({ invalid_type_error: "this field is required" }),
  years: z.number({ invalid_type_error: "this field is required" }),
  rate: z.number({ invalid_type_error: "this field is required" }),
  type: z.string({ message: "this field is required" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  setRepayment: (repayment: Repayment | null) => void;
}

const CalculationForm = ({ setRepayment }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const resetForm = () => {
    setRepayment(null);
    reset();
  };

  const calculate = (data: FormData) => {
    const annualRate = data.rate / 100; // Annual interest rate
    const r = annualRate / 12; // Monthly interest rate
    const n = data.years * 12; // Number of monthly payments

    const M = (data.amount * (r * (1 + r) ** n)) / ((1 + r) ** n - 1);
    const totalRepayment = M * n;

    const formatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    });

    const mortgage: Repayment = {
      total: formatter.format(totalRepayment),
      monthly: null,
      interest: null,
    };

    if (data.type === "interest") {
      mortgage.interest = formatter.format(totalRepayment - data.amount);
      mortgage.monthly = null;
    } else {
      (mortgage.monthly = formatter.format(M)), (mortgage.interest = null);
    }

    setRepayment(mortgage);
  };

  return (
    <>
      <div className="justify-between mb-10 min-[400px]:flex">
        <h1 className="text-xl font-bold">
          <span className="text-2xl">Mortgage Calculator</span>
        </h1>
        <button className="underline text-Slate-700" onClick={resetForm}>
          Clear All
        </button>
      </div>

      <form onSubmit={handleSubmit(calculate)} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="amount" className="mb-2 text-Slate-900">
            Mortgage Amount
          </label>
          <div
            className={`flex border rounded-md focus-within:border-Lime ${
              errors.amount
                ? "border-Red"
                : "border-Slate-700 hover:border-Slate-900"
            }`}
          >
            <span
              className={`p-3 px-4 text-Slate-900 rounded-tl-[inherit] rounded-bl-[inherit] font-bold has-[+_*:focus]:text-Slate-900 has-[+_*:focus]:bg-Lime ${
                errors.amount ? "bg-Red text-white" : "bg-Slate-100"
              }`}
            >
              £
            </span>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              id="amount"
              className="w-full font-bold p-3 rounded-br-[inherit] rounded-tr-[inherit] outline-none"
            />
          </div>
          {errors.amount && <p className="text-Red">{errors.amount.message}</p>}
        </div>

        <div className="grid min-[400px]:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="years" className="text-Slate-900">
              Mortgage Term
            </label>
            <div
              className={`flex border rounded-md group focus-within:border-Lime ${
                errors.years ? "border-Red" : "border-Slate-700"
              }`}
            >
              <input
                {...register("years", { valueAsNumber: true })}
                type="number"
                id="years"
                className="w-full font-bold p-3 rounded-tl-[inherit] rounded-bl-[inherit] outline-none"
              />
              <span
                className={`p-3 px-5 text-Slate-900 rounded-tr-[inherit] rounded-br-[inherit] font-bold group-focus-within:bg-Lime group-focus-within:text-Slate-900 ${
                  errors.years ? "bg-Red text-white" : "bg-Slate-100"
                }`}
              >
                years
              </span>
            </div>
            {errors.years && <p className="text-Red">{errors.years.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="rate" className="text-Slate-900">
              Interest Rate
            </label>
            <div
              className={`flex border rounded-md group focus-within:border-Lime ${
                errors.rate ? "border-Red" : "border-Slate-700"
              }`}
            >
              <input
                {...register("rate", { valueAsNumber: true })}
                type="number"
                id="rate"
                step="any"
                className="w-full font-bold p-3 rounded-tl-[inherit] rounded-bl-[inherit] outline-none"
              />
              <span
                className={`p-3 px-4 text-Slate-900 rounded-tr-[inherit] rounded-br-[inherit] font-bold group-focus-within:bg-Lime group-focus-within:text-Slate-900 ${
                  errors.rate ? "bg-Red text-white" : "bg-Slate-100"
                }`}
              >
                %
              </span>
            </div>
            {errors.rate && <p className="text-Red">{errors.rate.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-3 accent-Lime">
          <p>Mortgage Type</p>
          <label className="has-[:checked]:bg-Lime/25 flex items-center gap-5 font-bold hover:border-Lime border py-3 px-5 has-[:checked]:border-Lime rounded-md border-Slate-500 cursor-pointer">
            <input
              type="radio"
              className="checked:border checked:border-Lime"
              value="repayment"
              {...register("type")}
            />
            Repayment
          </label>
          <label className="has-[:checked]:bg-Lime/25 flex items-center gap-5 font-bold border py-3 px-5 hover:border-Lime has-[:checked]:border-Lime rounded-md border-Slate-500 cursor-pointer">
            <input
              type="radio"
              className="checked:border checked:border-Lime"
              value="interest"
              {...register("type")}
            />
            Interest Only
          </label>
          {errors.type && <p className="text-Red">{errors.type.message}</p>}
        </div>

        <button className="flex justify-center items-center min-[400px]:self-start gap-2 min-[400px]:gap-4 px-8 py-4 mt-5 text-lg font-bold transition-colors rounded-full bg-Lime hover:bg-Lime/50">
          <img src={Calculator} />
          Calculate Repayments
        </button>
      </form>
    </>
  );
};

export default CalculationForm;
