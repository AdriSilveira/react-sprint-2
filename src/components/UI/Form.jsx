import "./Form.scss";
export default function FormItem({ children, label, htmlFor, advice, error }) {
  //Properties--------------------------------------------------------

  //Hooks------------------------------------------

  //Context-------------------------------------------

  //Context----------------------------------------------------

  //Methods------------------------------------------------------

  //view---------------------------------------------------
  return (
    <div className="FormItem">
      <label className="FormLabel" htmlFor="ModuleName">
        {label}
      </label>
      {advice && <p className="FormAdvice">{advice}</p>}
      {children}
      {error && <p className="FormError">{error}</p>}
    </div>
  );
}
