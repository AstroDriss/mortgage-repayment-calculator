import IllustrationEmpty from "../assets/illustration-empty.svg";

const Empty = () => {
  return (
    <>
      <img src={IllustrationEmpty} alt="" />
      <h2 className="mb-4 text-2xl text-white">Results shown here</h2>
      <p className="text-center text-Slate-300">
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be
      </p>
    </>
  );
};

export default Empty;
