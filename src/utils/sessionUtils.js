const getsessionInfo = () => {
  let info = sessionStorage.getItem("auth_info");
    if(info !== null || info !== undefined || info !== '') {
      return JSON.parse(info);
    }
  return {}
  };

const setsessionInfo = (info) => {
  var infoText = JSON.stringify(info);
  sessionStorage.setItem("auth_info", infoText);
};

export default { getsessionInfo , setsessionInfo };
