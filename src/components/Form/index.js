import style from "./style.module.css";

export default function Form({
  onSubmit,
  commonInputProps,
  homeInputProps,
  awayInputProps,
  buttonText,
  disabled,
}) {
  return (
    <form className={style.form} onSubmit={onSubmit}>
      <input
        className={style.input}
        {...commonInputProps}
        {...homeInputProps}
      />
      <input
        className={style.input}
        {...commonInputProps}
        {...awayInputProps}
      />
      <button type="submit" className={style.button} disabled={disabled}>
        {buttonText}
      </button>
    </form>
  );
}
