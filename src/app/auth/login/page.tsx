import CredentialSide from "@/app/auth/login/CredentialSlide";
import LoginLayout from "@/app/auth/login/LoginLayout";
import PictureSide from "@/app/auth/login/PictureSlide";

const LoginPage = () => {
  return (
    <LoginLayout>
      <CredentialSide />
      <PictureSide />
    </LoginLayout>
  );
};

export default LoginPage;
