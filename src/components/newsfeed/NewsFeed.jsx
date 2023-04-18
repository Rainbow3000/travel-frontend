import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "./newsFeed.scss";
import { validateEmail } from "../../validate/validate";
const NewsFeed = () => {
  const [email, setEmail] = useState("");
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const isEmail = validateEmail(email);
    if (isEmail === null) {
      toast("Email không hợp lệ. Vui lòng kiểm tra lại !");
      return;
    }
    toast("Cảm ơn bạn đã tương tác với chúng tôi !");
    setEmail(""); 
  };

  return (
    <div className="news-feed-container">
      <form action="#" onSubmit={handleSubmitForm}>
        <h1>TIN MỚI</h1>
        <label htmlFor="">
          Gửi email của bạn để nhận thông tin mới nhất về chúng tôi.
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Nhập email của bạn tại đây ..."
          required
        />
        <button>
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
};

export default NewsFeed;
