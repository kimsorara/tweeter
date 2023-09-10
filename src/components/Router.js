import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "./Navigation";
import Profile from "routes/Profile";
const RouterList = ({ refresh, isLogin, userInfo }) => {
  return (
    <Router>
      {isLogin && <Navigation userInfo={userInfo} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLogin ? (
            <>
              <Route path="/" element={<Home userInfo={userInfo} />}></Route>
              <Route
                path="/profile"
                element={<Profile refresh={refresh} userInfo={userInfo} />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />}></Route>
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};
export default RouterList;
