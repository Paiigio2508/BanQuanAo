import React from "react";

const UserContext = React.createContext({
  idUser: null,
  userName: "Admin",
  linkAnh: "",
  setIdUser: () => {},
  setUserName: () => {},
  setLinkAnh: () => {},
});

export default UserContext;
