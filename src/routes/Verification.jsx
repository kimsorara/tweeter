import {useState, useEffect} from "react";
import {firebaseAuth, createUserWithEmailAndPassword, sendEmailVerification} from "../fbInstance";
import {collection, addDoc} from "firebase/firestore"; // Import Firestore functions
import {getFirestore} from "firebase/firestore";

const EmailVerificationSignup = () => {
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const handleSendCode = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, "123456");
      await sendEmailVerification(firebaseAuth.currentUser);

      setIsCodeSent(true);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      // 이메일 인증 코드 일치 여부 확인

      console.log("Verification code is valid.");

      // 회원가입 정보 저장
      const userRegistrationInfo = {
        email,
        userId,
        businessNumber,
      };
      const db = getFirestore(); // Replace with your Firestore instance
      await addDoc(collection(db, "userRegistrations"), userRegistrationInfo);
      setIsRegistered(true);
    } catch (error) {
      console.error("Error verifying code:", error);
      setVerificationError("Invalid verification code. Please try again.");
    }
  };

  return (
    <div>
      {isRegistered ? (
        <div>성공</div>
      ) : isCodeSent ? (
        <div>
          <h2>Enter Verification Code</h2>
          <form onSubmit={handleVerification}>
            <input type="text" placeholder="Username" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="text" placeholder="Business Number" value={businessNumber} onChange={(e) => setBusinessNumber(e.target.value)} />
            <button type="submit">Complete Signup</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Sign Up with Email Verification</h2>
          <form onSubmit={handleSendCode}>
            {/* <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Send Verification Code</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmailVerificationSignup;
