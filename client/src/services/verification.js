import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const emailVerifier = () => {
  const Navigate = useNavigate();

  // obtiene token de url y comprueba contra bd, si es válido redirige a página success
  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    const verifyEmail = async () => {
      try {
        Navigate("/verfscs");
      } catch (error) {

      }
    };
  }, []);

};

export default emailVerifier;