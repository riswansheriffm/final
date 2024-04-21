export default function Option({ elem, text }) {
  if (elem === "") {
    return (
      <option value="" disabled>
        {text}
      </option>
    );
  }

  return <option>{elem}</option>;
}
