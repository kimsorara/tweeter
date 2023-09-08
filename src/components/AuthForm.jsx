import { useState } from "react";
import {
  firebaseAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "fbInstance";
const Authform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [err, setErr] = useState(" ");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (newAccount) {
      //새로운 계정 생성 firebaseIndexDb에 정보가 저장된다
      try {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      } catch (err) {
        setErr(err);
      }
    }
  };
  const toggle = () => {
    setNewAccount((pre) => !pre);
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          className="authInput"
          onChange={onChange}
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {err && <span className="authError">{err}</span>}
      </form>
      <span onClick={toggle} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};
export default Authform;
