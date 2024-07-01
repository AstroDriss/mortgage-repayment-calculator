import { useState } from "react";
import CalculationForm from "./components/CalculationForm";

import Empty from "./components/Empty";
import RepaymentResult from "./components/RepaymentResult";

export interface Repayment {
  total: string;
  monthly: null | string;
  interest: null | string;
}

function App() {
  const [repayment, setRepayment] = useState<Repayment | null>(null);

  return (
    <main className="grid h-full place-content-center sm:w-[max(80%,600px)] min-[768px]:w-auto mx-auto">
      <article className="grid max-w-[1004px] min-[768px]:grid-cols-2 rounded-3xl shadow-xl bg-white">
        <div className="min-[400px]:p-10 p-5 bg-white rounded-[inherit]">
          <CalculationForm setRepayment={setRepayment} />
        </div>
        <div className="min-[400px]:p-10 p-5 bg-Slate-900 min-[768px]:rounded-tr-[inherit] rounded-br-[inherit] rounded-bl-[inherit] min-[768px]:rounded-bl-[60px] flex flex-col items-center justify-center">
          {repayment ? <RepaymentResult repayment={repayment} /> : <Empty />}
        </div>
      </article>
    </main>
  );
}

export default App;
