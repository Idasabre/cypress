// Random data generation functions
function randomEmail() {
    const randEmail = Math.random().toString(36).substring(2, 8);
    return `user_${randEmail}@gmail.com`;
  }
  
  function randomPwd() {
    const randomPwd = Math.random().toString(36).substring(2, 10);
    return randomPwd;
  }
  
  function randomPhoneNo() {
    const phNo = Math.floor(1000000 + Math.random() * 5000000).toString();
    return `+6019-${phNo}`;
  }
  
  // Exporting the functions
  module.exports = {
    randomEmail,
    randomPwd,
    randomPhoneNo
  };
  