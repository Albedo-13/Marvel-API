import { useForm, SubmitHandler } from 'react-hook-form';

import './charForm.scss';
import '../../style/button.scss';

const CharForm = () => {

  const {
    register,
    handleSubmit,
    formState: {
      errors
    } } = useForm();
  const onSubmit = (data) => {
    console.log("submitting: ", data);
    
  }

  console.log(errors);

  return (
    <div className="char-form">
      <div className="char-form__title">Or find a character by name:</div>
      <form
        className="char-form__form"
        onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("charName", { required: "This field is required." })}
          className="char-form__input"
          type="text"
          placeholder='Enter name' />
        <button
          type="submit"
          className="button button__main">
          <div className="inner">FIND</div>
        </button>
      </form>

      <p>{errors.charName?.message}</p>
    </div>
  );
}

export default CharForm;