const getConfig = () => {
  // token
  const getToken = localStorage.getItem("token-APV");
  // config
  const config = {
    headers: {
      "Context-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    },
  };
  return config;
};

export { getConfig };
