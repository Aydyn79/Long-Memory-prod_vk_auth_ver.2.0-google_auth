import { useEffect } from 'react'

function Login() {

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }


  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "140073813105-05evcieag1t9grl4o261n969t7oco9h3.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, [])

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
}



export default Login;
