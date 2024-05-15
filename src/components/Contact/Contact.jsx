import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
export default function Contact({ data: { id, name, number }, onDelete }) {
  return (
    <div className={css.container}>
      <div>
        <div className={css.user}>
          <div className={css.userIcon}>
            <FaUser />
          </div>
          <p className={css.userName}>{name}</p>
        </div>
        <div className={css.user}>
          <div className={css.phone}>
            <FaPhoneAlt />
          </div>
          <p className={css.phone}>{number}</p>
        </div>
      </div>

      <button className={css.button} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
