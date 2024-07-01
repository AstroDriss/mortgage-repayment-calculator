import { Repayment } from "../App";

interface Props {
  repayment: Repayment;
}

const RepaymentResult = ({ repayment }: Props) => {
  return (
    <div className="text-white">
      <h2 className="mb-3 text-2xl font-bold text-white">Your results</h2>
      <p className="text-Slate-300">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click "calculate repayments"
        again.
      </p>

      <div className="flex flex-col gap-5 p-7 border-t-4 rounded-md border-Lime bg-[#0e2431] mt-12">
        <p className="text-Slate-300">
          {repayment.monthly
            ? "Your monthly repayments"
            : "Your total interest"}
          <strong className="block mt-2 text-5xl text-Lime">
            {repayment.monthly ? repayment.monthly : repayment.interest}
          </strong>
        </p>

        <hr className="border-Slate-700" />

        <p className="text-Slate-300">
          Total you'll repay over the term
          <em className="block mt-2 text-2xl not-italic font-bold text-white">
            {repayment.total}
          </em>
        </p>
      </div>
    </div>
  );
};

export default RepaymentResult;
