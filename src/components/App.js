import { useEffect, useState } from "react";
import { firebaseAuth, onAuthStateChanged } from "fbInstance";
import RouterList from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    //현재 로그인상태를 알수있다 observer 기능
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setIsLogin(true);
        // setUserInfo({
        //   displayName: user.displayName,
        //   uid: user.displayName,
        //   // updateProfile: (args) => user.updateProfile(args),
        // });
        setUserInfo(user);
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);
  const refresh = () => {
    // // 큰 obj 변화를 알아차리기에 힘들다 값을 담기도 전에 실행한다
    // setUserInfo(firebaseAuth.currentUser);
    const user = firebaseAuth.currentUser;
    // setUserInfo({
    //   displayName: user.displayName,
    //   uid: user.displayName,
    //   // updateProfile: (args) => user.updateProfile(args),
    // });
    setUserInfo(Object.assign({}, user));
  };
  return (
    <>
      {init ? (
        <RouterList refresh={refresh} isLogin={isLogin} userInfo={userInfo} />
      ) : (
        "로딩중"
      )}
      <footer>@copylight {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
